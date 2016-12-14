"use strict";
var lb_config_1 = require('../lb.config');
var index_1 = require('./index');
var socket_connections_1 = require('../sockets/socket.connections');
var FireLoop = (function () {
    function FireLoop(token) {
        this.references = {};
        this.socket = socket_connections_1.SocketConnections.getHandler(lb_config_1.LoopBackConfig.getPath(), token);
    }
    FireLoop.prototype.ref = function (model) {
        var name = model.getModelName();
        if (this.references[name]) {
            return this.references[name];
        }
        this.references[name] = new index_1.FireLoopRef(name, this.socket);
        return this.references[name];
    };
    return FireLoop;
}());
exports.FireLoop = FireLoop;
//# sourceMappingURL=FireLoop.js.map