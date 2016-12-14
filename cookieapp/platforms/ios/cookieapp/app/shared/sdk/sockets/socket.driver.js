"use strict";
/* tslint:disable */
var SocketIO = require('nativescript-socketio').SocketIO;
var SocketDriver = (function () {
    function SocketDriver() {
    }
    SocketDriver.connect = function (url, options) {
        var socketIO = new SocketIO(url, options);
        socketIO.connect();
        return socketIO;
    };
    return SocketDriver;
}());
exports.SocketDriver = SocketDriver;
//# sourceMappingURL=socket.driver.js.map