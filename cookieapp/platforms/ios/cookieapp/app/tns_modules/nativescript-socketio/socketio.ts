import {device} from "platform"

declare var SocketIOClient;
declare var SocketAckEmitter;

declare var NSURL;
declare var NSDictionary;
declare var NSMutableArray;
declare var UInt64;

export class SocketIO {

    private socket: any;

    /**
     * Class Constructor
     * args[0]: Connection URL as String
     * args[1]: Connection Options
     */
    constructor(...args: any[]) {
        switch (args.length) {
            case 2:
                // Convert options to JS Array 
                const keys = Object.keys(args[1]);

                // Marshal Connection Options
                const keysNS = new NSMutableArray();
                const valuesNS = new NSMutableArray();

                for (let i = 0; i < keys.length; i++) {
                    keysNS.addObject(keys[i]);
                    if (typeof args[1][keys[i]] == 'object') {
                        let obj = args[1][keys[i]]
                        let key = new NSMutableArray()
                        key.addObject(obj[0])
                        let val = new NSMutableArray()
                        val.addObject(obj[1])
                        valuesNS.addObject(NSDictionary.dictionaryWithObjectsForKeys(val, key));
                    } else {
                        valuesNS.addObject(args[1][keys[i]]);
                    }
                }

                // Create Options as NSDictionary
                const opts = NSDictionary.dictionaryWithObjectsForKeys(valuesNS, keysNS);

                // Create Socket
                if (parseInt(device.osVersion) >= 10) {
					this.socket = SocketIOClient.alloc().initWithSocketURLConfig(
						NSURL.URLWithString(args[0]),
						opts
					);
                } else {
					this.socket = SocketIOClient.alloc().initWithSocketURLOptions(
						NSURL.URLWithString(args[0]),
						opts
					);
                }
                break;

            case 3:
                this.instance = args.pop();
                break;
        }
    }

    on(event: String, callback: Function): void {

        this.socket.onCallback(event, (data, ack) => {

            if (ack) {
                callback(data, ack);
            }
            else {
                callback(data);
            }


        });
    };

    connect(): void {
        this.socket.connect();
    }

    emit(...args: any[]): void {
        if (!args) {
            return console.error('Emit Failed: No arguments');
        }

        // Slice parameters into Event and Message/Ack Callback
        const event = args[0];
        const payload = Array.prototype.slice.call(args, 1);

        // Check for ack callback
        let ack = payload.pop();

        // Remove ack if final argument is not a function
        if (ack && typeof ack !== 'function') {
            payload.push(ack);
            ack = null;
        }

        // Send Emit
        if (ack) {

            const emit = this.socket.emitWithAckWithItems(event, payload)
            emit(0, (args) => {

                // Convert Arguments to JS Array from NSArray
                const marshalledArgs = [];
                for (let i = 0; i < args.count; i++) {
                    marshalledArgs.push(args.objectAtIndex(i));
                }

                // Call callback
                ack.apply(null, marshalledArgs);
            });

        }
        else {
            // Emit without Ack Callback
            this.socket.emitWithItems(event, payload);
        }

    }

    disconnect(): void {
        this.socket.disconnect();
    }

    public get instance() {
        return this.socket;
    }

    public set instance(instance) {
        this.socket = instance;
    }

    joinNamespace(nsp: String): void {
        this.socket.joinNamespace(nsp);
    }

    leaveNamespace(): void {
        this.socket.leaveNamespace();
    }
}
