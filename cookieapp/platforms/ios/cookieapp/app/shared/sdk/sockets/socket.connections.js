"use strict";
/* tslint:disable */
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module SocketConnections
* @license MTI
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web and NativeScript 2.
**/
var socket_driver_1 = require('./socket.driver');
var SocketConnections = (function () {
    function SocketConnections() {
    }
    SocketConnections.getHandler = function (url, token) {
        if (!SocketConnections.connections[url]) {
            console.log('Creating a new connection with: ', url);
            var config_1 = { log: false, secure: false, forceWebsockets: true };
            SocketConnections.connections[url] = socket_driver_1.SocketDriver.connect(url, config_1);
            SocketConnections.connections[url].on('connect', function () {
                if (!SocketConnections.configured)
                    SocketConnections.setupConnection(url, token, config_1);
            });
            var forceConfig_1 = setInterval(function () {
                if (!SocketConnections.configured && SocketConnections.connections[url].connected) {
                    console.info('Forcing IO Configuration');
                    SocketConnections.setupConnection(url, token, config_1);
                    clearInterval(forceConfig_1);
                }
                else if (SocketConnections.configured) {
                    clearInterval(forceConfig_1);
                }
            }, 1000);
        }
        else {
            console.log('Reusing existing connection: ', url);
        }
        return SocketConnections.connections[url];
    };
    SocketConnections.setupConnection = function (url, token, config) {
        SocketConnections.configured = true;
        console.log('Connected to %s', url);
        if (token.id) {
            SocketConnections.connections[url].emit('authentication', token);
        }
        SocketConnections.connections[url].on('unauthorized', function (res) { return console.error('Unauthenticated', res); });
        setInterval(function () { return SocketConnections.connections[url].emit('lb-ping'); }, 15000);
        SocketConnections.connections[url].on('lb-pong', function (data) { return console.info('Heartbeat: ', data); });
        SocketConnections.connections[url].on('disconnect', function (data) {
            console.info('Unexpected disconnection from IO - Socket IO will try to reconnect');
        });
    };
    SocketConnections.connections = {};
    SocketConnections.configured = false;
    return SocketConnections;
}());
exports.SocketConnections = SocketConnections;
//# sourceMappingURL=socket.connections.js.map