[![npm](https://img.shields.io/npm/v/nativescript-socketio.svg)](https://www.npmjs.com/package/nativescript-socketio)
[![npm](https://img.shields.io/npm/dt/nativescript-socketio.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-socketio)
# nativescript-socketio
# Usage
```
npm install nativescript-socketio
```
Set connection string and options then connect

```js
var SocketIO = require('nativescript-socketio');
var socketIO = new SocketIO(url,opts);
```
Connect to server
```js
socketIO.connect()
```

Send data to the server
```js
socketIO.emit(event,data)
```
Listen for data 
```js
socketIO.on(event,callback)
```
Set instance
```js
new SocketIO(null,null,oldInstance)
```
##Running Demo

Start socketio server
```
cd demo/demo-server
npm install
node app
```

start demo
```
cd demo
tns run android
```

##Screenshot
![socketio](screenshots/socketio_.gif?raw=true)
