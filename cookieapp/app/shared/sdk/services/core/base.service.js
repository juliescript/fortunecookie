"use strict";
/* tslint:disable */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var search_params_1 = require('./search.params');
var error_service_1 = require('./error.service');
var auth_service_1 = require('./auth.service');
var lb_config_1 = require('../../lb.config');
var index_1 = require('../../models/index');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var Subject_1 = require('rxjs/Subject');
var socket_connections_1 = require('../../sockets/socket.connections');
/**
* @module BaseLoopBackApi
* @author Nikolay Matiushenkov <https://github.com/mnvx>
* @contributor Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
* @license MTI
* @description
* Abstract class that will be implemented in every custom service automatically built
* by the sdk builder.
* It provides the core functionallity for every API call, either by HTTP Calls or by
* WebSockets.
**/
var BaseLoopBackApi = (function () {
    function BaseLoopBackApi(http, auth, searchParams, errorHandler) {
        this.http = http;
        this.auth = auth;
        this.searchParams = searchParams;
        this.errorHandler = errorHandler;
    }
    /**
     * Process request
     * @param string  method      Request method (GET, POST, PUT)
     * @param string  url         Request url (my-host/my-url/:id)
     * @param any     routeParams Values of url parameters
     * @param any     urlParams   Parameters for building url (filter and other)
     * @param any     postBody    Request postBody
     * @param boolean isio        Request socket connection (When IO is enabled)
     */
    BaseLoopBackApi.prototype.request = function (method, url, routeParams, urlParams, postBody, isio) {
        if (routeParams === void 0) { routeParams = {}; }
        if (urlParams === void 0) { urlParams = {}; }
        if (postBody === void 0) { postBody = null; }
        if (isio === void 0) { isio = false; }
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (this.auth.getAccessTokenId()) {
            headers.append('Authorization', lb_config_1.LoopBackConfig.getAuthPrefix() + this.auth.getAccessTokenId());
        }
        var requestUrl = url;
        var key;
        for (key in routeParams) {
            requestUrl = requestUrl.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1");
        }
        if (isio) {
            if (requestUrl.match(/fk/)) {
                var arr = requestUrl.split('/');
                arr.pop();
                requestUrl = arr.join('/');
            }
            var event_1 = ("[" + method + "]" + requestUrl).replace(/\?/, '');
            var subject_1 = new Subject_1.Subject();
            var token = new index_1.AccessToken();
            token.id = this.auth.getAccessTokenId();
            token.userId = this.auth.getCurrentUserId();
            var socket = socket_connections_1.SocketConnections.getHandler(lb_config_1.LoopBackConfig.getPath(), token);
            socket.on(event_1, function (res) { return subject_1.next(res); });
            return subject_1.asObservable();
        }
        // Body fix for built in remote methods using "data", "options" or "credentials
        // that are the actual body, Custom remote method properties are different and need
        // to be wrapped into a body object
        var body;
        var postBodyKeys = typeof postBody === 'object' ? Object.keys(postBody) : [];
        if (postBodyKeys.length === 1) {
            body = postBody[postBodyKeys[0]];
        }
        else {
            body = postBody;
        }
        this.searchParams.setJSON(urlParams);
        var request = new http_1.Request({
            headers: headers,
            method: method,
            url: urlParams.filter ? requestUrl + "?filter=" + encodeURI(JSON.stringify(urlParams.filter))
                : requestUrl,
            search: !urlParams.filter && Object.keys(urlParams).length > 0
                ? this.searchParams.getURLSearchParams() : null,
            body: body ? JSON.stringify(body) : undefined
        });
        return this.http.request(request)
            .map(function (res) { return (res.text() != "" ? res.json() : {}); })
            .catch(this.errorHandler.handleError);
    };
    BaseLoopBackApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Inject(auth_service_1.LoopBackAuth)),
        __param(2, core_1.Inject(search_params_1.JSONSearchParams)),
        __param(3, core_1.Optional()),
        __param(3, core_1.Inject(error_service_1.ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.LoopBackAuth, search_params_1.JSONSearchParams, error_service_1.ErrorHandler])
    ], BaseLoopBackApi);
    return BaseLoopBackApi;
}());
exports.BaseLoopBackApi = BaseLoopBackApi;
//# sourceMappingURL=base.service.js.map