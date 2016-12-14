declare var io: any;
import app = require("application");
const Emitter = io.socket.emitter.Emitter;
const IO = io.socket.client.IO;
const Socket = io.socket.client.Socket;
const Ack = io.socket.client.Ack;
const JSONObject = org.json.JSONObject;
const JSONArray = org.json.JSONArray;
const JSONException = org.json.JSONException;
export class SocketIO {
    private socket: any;
    constructor(...args: any[]) {
        switch (args.length) {
            case 2:
                let opts = new IO.Options();
                (<any>Object).assign(opts, args[1]);
                this.socket = IO.socket(args[0], opts);
                break;
            case 3:
                this.instance = args.pop();
                break;
        }

    }

    on(event: string, callback) {
        this.socket.on(event, new Emitter.Listener({
            call: function (args) {
                let payload = Array.prototype.slice.call(args);
                let ack = payload.pop();
                if (ack && !(ack.getClass().getName().indexOf('io.socket.client.Socket') === 0 && ack.call)) {
                    payload.push(ack);
                    ack = null;
                }

                payload = payload.map(SocketIO.deserialize);

                if (ack) {
                    let _ack = ack;
                    ack = function () {
                        var args = Array.prototype.slice.call(arguments).map(SocketIO.serialize);
                        _ack.call(args);
                    };
                    payload.push(ack);
                }
                callback.apply(null, payload);

            }
        }))
    }

    connect() {
        this.socket.connect();
    }

    emit(...args: any[]) {
        if (!args) {
            return console.error('Emit Failed: No arguments');
        }

        let event = args[0];
        let payload = Array.prototype.slice.call(args, 1);
        let ack = payload.pop();
        if (ack && typeof ack !== 'function') {
            payload.push(ack);
            ack = null;
        }
        payload = payload.map(SocketIO.serialize);
        if (ack) {
            payload.push(new Ack({
                call: (args) => {
                    args = Array.prototype.slice.call(args).map(SocketIO.deserialize);
                    ack.apply(null, args);
                },
            }));
        }
        this.socket.emit(event, payload);
    }

    disconnect() {
        this.socket.disconnect();
    }

    public get instance() {
        return this.socket;
    }

    public set instance(instance) {
        this.socket = instance;
    }

    joinNamespace(nsp: String): void {
        if (this.socket.connected()) {

            const manager = this.socket.io();
            this.socket = manager.socket(nsp);

            // Only join if currently connected. Otherwise just configure to join on connect. 
            // This mirrors IOS behavior
            this.socket.connect();

        }
        else {

            const manager = this.socket.io();
            this.socket = manager.socket(nsp);

        }
    }

    leaveNamespace(): void {
        // Not Implemented
    }
    static serialize(value) {
        let store;
        switch (typeof value) {
            case 'string':
            case 'boolean':
            case 'number':
                return value;
            case 'object':
                if (!value) {
                    return null;
                }

                if (value instanceof Date) {
                    return value.toJSON();
                }
                if (Array.isArray(value)) {
                    store = new JSONArray();
                    value.forEach((item) => {
                        store.put(item);
                    });
                    return store;
                }
                store = new JSONObject();
                Object.keys(value).forEach((key) => {
                    let item = value[key];
                    store.put(key, SocketIO.serialize(item));
                })
                return store;
            default: return null;
        }

    }
    static deserialize(value) {
        if (value === null || typeof value !== 'object') {
            return value;
        }
        let store;
        switch (value.getClass().getName()) {
            case 'java.lang.String':
                return String(value);
            case 'java.lang.Boolean':
                return Boolean(value);
            case 'java.lang.Integer':
            case 'java.lang.Long':
            case 'java.lang.Double':
            case 'java.lang.Short':
                return Number(value);
            case 'org.json.JSONArray':
                store = new Array();
                for (let i = 0; i < value.length(); i++) {
                    store[i] = SocketIO.deserialize(value.get(i));
                }
                break;
            case 'org.json.JSONObject':
                store = new Object();
                let i = value.keys();
                while (i.hasNext()) {
                    let key = i.next();
                    store[key] = SocketIO.deserialize(value.get(key))
                }
                break;
            default:
                store = null;
        }
        return store;

    }

}