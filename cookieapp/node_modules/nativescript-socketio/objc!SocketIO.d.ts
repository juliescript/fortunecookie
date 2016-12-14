
declare class SSLCert extends NSObject {

	static alloc(): SSLCert; // inherited from NSObject

	static new(): SSLCert; // inherited from NSObject

	constructor(o: { data: NSData; });

	constructor(o: { key: any; });

	initWithData(data: NSData): this;

	initWithKey(key: any): this;
}

declare class SSLSecurity extends NSObject {

	static alloc(): SSLSecurity; // inherited from NSObject

	static new(): SSLSecurity; // inherited from NSObject

	validatedDN: boolean;

	constructor(o: { certs: NSArray<SSLCert>; usePublicKeys: boolean; });

	constructor(o: { usePublicKeys: boolean; });

	initWithCertsUsePublicKeys(certs: NSArray<SSLCert>, usePublicKeys: boolean): this;

	initWithUsePublicKeys(usePublicKeys: boolean): this;

	isValidDomain(trust: any, domain: string): boolean;
}

declare class SocketAckEmitter extends NSObject {

	static alloc(): SocketAckEmitter; // inherited from NSObject

	static new(): SocketAckEmitter; // inherited from NSObject

	with(items: NSArray<any>): void;
}

declare class SocketAnyEvent extends NSObject {

	static alloc(): SocketAnyEvent; // inherited from NSObject

	static new(): SocketAnyEvent; // inherited from NSObject

	/* readonly */ event: string;

	/* readonly */ items: NSArray<any>;
}

declare class SocketClientManager extends NSObject {

	static alloc(): SocketClientManager; // inherited from NSObject

	static new(): SocketClientManager; // inherited from NSObject

	static sharedManager(): SocketClientManager;

	addSocketLabeledAs(socket: SocketIOClient, label: string): void;

	objectForKeyedSubscript(string: string): SocketIOClient;

	removeSocket(socket: SocketIOClient): SocketIOClient;

	removeSocketWithLabel(label: string): SocketIOClient;

	removeSockets(): void;

	setObjectForKeyedSubscript(socket: SocketIOClient, string: string): void;
}

declare class SocketEngine extends NSObject implements NSURLSessionDelegate, SocketEngineSpec {

	static alloc(): SocketEngine; // inherited from NSObject

	static new(): SocketEngine; // inherited from NSObject

	/* readonly */ invalidated: boolean;

	postWait: NSArray<string>;

	/* readonly */ session: NSURLSession;

	waitingForPoll: boolean;

	waitingForPost: boolean;

	client: SocketEngineClient; // inherited from SocketEngineSpec

	/* readonly */ closed: boolean; // inherited from SocketEngineSpec

	connectParams: NSDictionary<string, any>; // inherited from SocketEngineSpec

	/* readonly */ connected: boolean; // inherited from SocketEngineSpec

	/* readonly */ cookies: NSArray<NSHTTPCookie>; // inherited from SocketEngineSpec

	/* readonly */ debugDescription: string; // inherited from NSObjectProtocol

	/* readonly */ description: string; // inherited from NSObjectProtocol

	/* readonly */ doubleEncodeUTF8: boolean; // inherited from SocketEngineSpec

	/* readonly */ emitQueue: NSObject; // inherited from SocketEngineSpec

	/* readonly */ extraHeaders: NSDictionary<string, string>; // inherited from SocketEngineSpec

	/* readonly */ fastUpgrade: boolean; // inherited from SocketEngineSpec

	/* readonly */ forcePolling: boolean; // inherited from SocketEngineSpec

	/* readonly */ forceWebsockets: boolean; // inherited from SocketEngineSpec

	/* readonly */ handleQueue: NSObject; // inherited from SocketEngineSpec

	/* readonly */ hash: number; // inherited from NSObjectProtocol

	/* readonly */ isProxy: boolean; // inherited from NSObjectProtocol

	/* readonly */ parseQueue: NSObject; // inherited from SocketEngineSpec

	/* readonly */ polling: boolean; // inherited from SocketEngineSpec

	/* readonly */ probing: boolean; // inherited from SocketEngineSpec

	/* readonly */ sid: string; // inherited from SocketEngineSpec

	/* readonly */ socketPath: string; // inherited from SocketEngineSpec

	/* readonly */ superclass: typeof NSObject; // inherited from NSObjectProtocol

	/* readonly */ urlPolling: NSURL; // inherited from SocketEngineSpec

	/* readonly */ urlWebSocket: NSURL; // inherited from SocketEngineSpec

	/* readonly */ websocket: boolean; // inherited from SocketEngineSpec

	/* readonly */ ws: WebSocket; // inherited from SocketEngineSpec

	/* readonly */  // inherited from NSObjectProtocol

	constructor(o: { client: SocketEngineClient; url: NSURL; options: NSDictionary<any, any>; }); // inherited from SocketEngineSpec

	URLSessionDidBecomeInvalidWithError(session: NSURLSession, error: NSError): void;

	URLSessionDidFinishEventsForBackgroundURLSession(session: NSURLSession): void;

	URLSessionDidReceiveChallengeCompletionHandler(session: NSURLSession, challenge: NSURLAuthenticationChallenge, completionHandler: (p1: NSURLSessionAuthChallengeDisposition, p2: NSURLCredential) => void): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	connect(): void;

	didError(error: string): void;

	disconnect(reason: string): void;

	doFastUpgrade(): void;

	flushWaitingForPostToWebSocket(): void;

	initWithClientUrlOptions(client: SocketEngineClient, url: NSURL, options: NSDictionary<any, any>): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	parseEngineData(data: NSData): void;

	parseEngineMessageFromPolling(message: string, fromPolling: boolean): void;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	websocketDidConnect(socket: WebSocket): void;

	websocketDidDisconnectError(socket: WebSocket, error: NSError): void;

	writeWithTypeWithData(msg: string, type: SocketEnginePacketType, data: NSArray<NSData>): void;
}

interface SocketEngineClient {

	engineDidClose(reason: string): void;

	engineDidError(reason: string): void;

	engineDidOpen(reason: string): void;

	parseEngineBinaryData(data: NSData): void;

	parseEngineMessage(msg: string): void;
}
declare var SocketEngineClient: {

	prototype: SocketEngineClient;
};

declare const enum SocketEnginePacketType {

	Open = 0,

	Close = 1,

	Ping = 2,

	Pong = 3,

	Message = 4,

	Upgrade = 5,

	Noop = 6
}

interface SocketEngineSpec {

	client: SocketEngineClient;

	closed: boolean;

	connectParams: NSDictionary<string, any>;

	connected: boolean;

	cookies: NSArray<NSHTTPCookie>;

	doubleEncodeUTF8: boolean;

	emitQueue: NSObject;

	extraHeaders: NSDictionary<string, string>;

	fastUpgrade: boolean;

	forcePolling: boolean;

	forceWebsockets: boolean;

	handleQueue: NSObject;

	parseQueue: NSObject;

	polling: boolean;

	probing: boolean;

	sid: string;

	socketPath: string;

	urlPolling: NSURL;

	urlWebSocket: NSURL;

	websocket: boolean;

	ws: WebSocket;

	connect(): void;

	didError(error: string): void;

	disconnect(reason: string): void;

	doFastUpgrade(): void;

	flushWaitingForPostToWebSocket(): void;

	initWithClientUrlOptions?(client: SocketEngineClient, url: NSURL, options: NSDictionary<any, any>): SocketEngineSpec;

	parseEngineData(data: NSData): void;

	parseEngineMessageFromPolling(message: string, fromPolling: boolean): void;

	writeWithTypeWithData(msg: string, type: SocketEnginePacketType, data: NSArray<NSData>): void;
}
declare var SocketEngineSpec: {

	prototype: SocketEngineSpec;
};

declare class SocketIOClient extends NSObject implements SocketEngineClient {

	static alloc(): SocketIOClient; // inherited from NSObject

	static new(): SocketIOClient; // inherited from NSObject

	/* readonly */ engine: SocketEngineSpec;

	forceNew: boolean;

	nsp: string;

	reconnectWait: number;

	reconnects: boolean;

	/* readonly */ sid: string;

	/* readonly */ socketURL: NSURL;

	/* readonly */ status: SocketIOClientStatus;

	constructor(o: { socketURL: NSURL; config: NSDictionary<any, any>; });

	connect(): void;

	connectWithTimeoutAfterWithTimeoutHandler(timeoutAfter: number, handler: () => void): void;

	disconnect(): void;

	emitWithAckWithItems(event: string, items: NSArray<any>): (p1: number, p2: (p1: NSArray<any>) => void) => void;

	emitWithItems(event: string, items: NSArray<any>): void;

	engineDidClose(reason: string): void;

	engineDidError(reason: string): void;

	engineDidOpen(reason: string): void;

	handleEventDataIsInternalMessageWithAck(event: string, data: NSArray<any>, isInternalMessage: boolean, ack: number): void;

	initWithSocketURLConfig(socketURL: NSURL, config: NSDictionary<any, any>): this;

	joinNamespace(namespace_: string): void;

	leaveNamespace(): void;

	off(event: string): void;

	offWithId(id: NSUUID): void;

	onAny(handler: (p1: SocketAnyEvent) => void): void;

	onCallback(event: string, callback: (p1: NSArray<any>, p2: SocketAckEmitter) => void): NSUUID;

	onceCallback(event: string, callback: (p1: NSArray<any>, p2: SocketAckEmitter) => void): NSUUID;

	parseEngineBinaryData(data: NSData): void;

	parseEngineMessage(msg: string): void;

	reconnect(): void;

	removeAllHandlers(): void;
}

declare const enum SocketIOClientStatus {

	NotConnected = 0,

	Disconnected = 1,

	Connecting = 2,

	Connected = 3
}

declare var SocketIOVersionNumber: number;

declare var SocketIOVersionString: interop.Reference<number>;

declare class WebSocket extends NSObject implements NSStreamDelegate {

	static ErrorDomain(): string;

	static alloc(): WebSocket; // inherited from NSObject

	static new(): WebSocket; // inherited from NSObject

	callbackQueue: NSObject;

	/* readonly */ currentURL: NSURL;

	headers: NSDictionary<string, string>;

	/* readonly */ isConnected: boolean;

	onConnect: () => void;

	onData: (p1: NSData) => void;

	onDisconnect: (p1: NSError) => void;

	onPong: () => void;

	onText: (p1: string) => void;

	origin: string;

	security: SSLSecurity;

	selfSignedSSL: boolean;

	timeout: number;

	voipEnabled: boolean;

	/* readonly */ debugDescription: string; // inherited from NSObjectProtocol

	/* readonly */ description: string; // inherited from NSObjectProtocol

	/* readonly */ hash: number; // inherited from NSObjectProtocol

	/* readonly */ isProxy: boolean; // inherited from NSObjectProtocol

	/* readonly */ superclass: typeof NSObject; // inherited from NSObjectProtocol

	/* readonly */  // inherited from NSObjectProtocol

	constructor(o: { url: NSURL; protocols: NSArray<string>; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	connect(): void;

	initWithUrlProtocols(url: NSURL, protocols: NSArray<string>): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	streamHandleEvent(aStream: NSStream, eventCode: NSStreamEvent): void;

	writeDataCompletion(data: NSData, completion: () => void): void;

	writePingCompletion(data: NSData, completion: () => void): void;

	writeStringCompletion(str: string, completion: () => void): void;
}
