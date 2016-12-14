"use strict";
var Subject_1 = require('rxjs/Subject');
var lb_config_1 = require('../../lb.config');
var socket_connections_1 = require('../../sockets/socket.connections');
var IO = (function () {
    function IO(token) {
        this.observables = {};
        this.socket = socket_connections_1.SocketConnections.getHandler(lb_config_1.LoopBackConfig.getPath(), token);
    }
    IO.prototype.emit = function (event, data) {
        this.socket.emit('ME:RT:1://event', {
            event: event,
            data: data
        });
    };
    IO.prototype.on = function (event) {
        if (this.observables[event]) {
            return this.observables[event];
        }
        var subject = new Subject_1.Subject();
        this.socket.on(event, function (res) { return subject.next(res); });
        this.observables[event] = subject.asObservable();
        return this.observables[event];
    };
    return IO;
}());
exports.IO = IO;
//# sourceMappingURL=io.service.js.map