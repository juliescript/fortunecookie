
export declare class SocketIO {
    socket: any;
    constructor(...args: any[]);
    on(event: string, callback: Function): void;
    connect(): void;
    emit(...args: any[]): void;
    disconnect(): void;
    instance: any;
    joinNamespace(nsp: string): void;
    leaveNamespace(): void;
}
