"use strict";
/* tslint:disable */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var base_service_1 = require('../core/base.service');
var lb_config_1 = require('../../lb.config');
var auth_service_1 = require('../core/auth.service');
var search_params_1 = require('../core/search.params');
var error_service_1 = require('../core/error.service');
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/map');
var Quote_1 = require('../../models/Quote');
/**
 * Api services for the `Quote` model.
 */
var QuoteApi = (function (_super) {
    __extends(QuoteApi, _super);
    function QuoteApi(http, auth, searchParams, errorHandler) {
        _super.call(this, http, auth, searchParams, errorHandler);
        this.auth = auth;
        this.searchParams = searchParams;
    }
    /**
     * Create a new instance of the model and persist it into the data source.
     *
     * @param object data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Quote` object.)
     * </em>
     */
    QuoteApi.prototype.create = function (data) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result.map(function (instance) { return new Quote_1.Quote(instance); });
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param object data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Quote` object.)
     * </em>
     */
    QuoteApi.prototype.upsert = function (data) {
        if (data === void 0) { data = {}; }
        var _method = "PUT";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result.map(function (instance) { return new Quote_1.Quote(instance); });
    };
    /**
     * Replace an existing model instance or insert a new one into the data source.
     *
     * @param object data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Quote` object.)
     * </em>
     */
    QuoteApi.prototype.replaceOrCreate = function (data) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes/replaceOrCreate";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result;
    };
    /**
     * Update an existing model instance or insert a new one into the data source based on the where criteria.
     *
     * @param object where Criteria to match model instances
     *
     * @param object data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Quote` object.)
     * </em>
     */
    QuoteApi.prototype.upsertWithWhere = function (where, data) {
        if (where === void 0) { where = {}; }
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes/upsertWithWhere";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result.map(function (instance) { return new Quote_1.Quote(instance); });
    };
    /**
     * Check whether a model instance exists in the data source.
     *
     * @param any id Model id
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `exists` – `{boolean}` -
     */
    QuoteApi.prototype.exists = function (id) {
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes/:id/exists";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result;
    };
    /**
     * Find a model instance by {{id}} from the data source.
     *
     * @param any id Model id
     *
     * @param object filter Filter defining fields and include
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Quote` object.)
     * </em>
     */
    QuoteApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (filter)
            _urlParams.filter = filter;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result.map(function (instance) { return new Quote_1.Quote(instance); });
    };
    /**
     * Replace attributes for a model instance and persist it into the data source.
     *
     * @param any id Model id
     *
     * @param object data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Quote` object.)
     * </em>
     */
    QuoteApi.prototype.replaceById = function (id, data) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes/:id/replace";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result;
    };
    /**
     * Find all instances of the model matched by filter from the data source.
     *
     * @param object filter Filter defining fields, where, include, order, offset, and limit
     *
     * @returns object[] An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Quote` object.)
     * </em>
     */
    QuoteApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (filter)
            _urlParams.filter = filter;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result.map(function (instances) {
            return instances.map(function (instance) { return new Quote_1.Quote(instance); });
        });
    };
    /**
     * Find first instance of the model matched by filter from the data source.
     *
     * @param object filter Filter defining fields, where, include, order, offset, and limit
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Quote` object.)
     * </em>
     */
    QuoteApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes/findOne";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (filter)
            _urlParams.filter = filter;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result.map(function (instance) { return new Quote_1.Quote(instance); });
    };
    /**
     * Update instances of the model matched by {{where}} from the data source.
     *
     * @param object where Criteria to match model instances
     *
     * @param object data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Information related to the outcome of the operation
     */
    QuoteApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = {}; }
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes/update";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result;
    };
    /**
     * Delete a model instance by {{id}} from the data source.
     *
     * @param any id Model id
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Quote` object.)
     * </em>
     */
    QuoteApi.prototype.deleteById = function (id) {
        var _method = "DELETE";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result;
    };
    /**
     * Count instances of the model matched by where from the data source.
     *
     * @param object where Criteria to match model instances
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    QuoteApi.prototype.count = function (where) {
        if (where === void 0) { where = {}; }
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes/count";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param any id PersistedModel id
     *
     * @param object data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Quote` object.)
     * </em>
     */
    QuoteApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = {}; }
        var _method = "PUT";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result;
    };
    /**
     * Create a change stream.
     *
     * @param object data Request data.
     *
     *  - `options` – `{object}` -
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `changes` – `{ReadableStream}` -
     */
    QuoteApi.prototype.createChangeStream = function () {
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes/change-stream";
        var subject = new Subject_1.Subject();
        if (typeof EventSource !== 'undefined') {
            var emit = function (msg) { return subject.next(JSON.parse(msg.data)); };
            var source = new EventSource(_url);
            source.addEventListener('data', emit);
            source.onerror = emit;
        }
        else {
            console.warn('SDK Builder: EventSource is not supported');
        }
        return subject.asObservable();
    };
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{any}` -
     */
    QuoteApi.prototype.myRemote = function () {
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes/my-remote";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result;
    };
    /**
     * Statistical information for Quote registers.
     *
     * @param string range hourly, daily, weekly, monthly, yearly, custom
     *
     * @param object custom {"start": date, "end": date }
     *
     * @param object where where filter
     *
     * @param string groupBy group by filter
     *
     * @returns object[] An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Quote` object.)
     * </em>
     */
    QuoteApi.prototype.stats = function (range, custom, where, groupBy) {
        if (custom === void 0) { custom = {}; }
        if (where === void 0) { where = {}; }
        if (groupBy === void 0) { groupBy = {}; }
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes/stats";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (range)
            _urlParams.range = range;
        if (custom)
            _urlParams.custom = custom;
        if (where)
            _urlParams.where = where;
        if (groupBy)
            _urlParams.groupBy = groupBy;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result;
    };
    /**
     * Create a new instance of the model and persist it into the data source.
     *
     * @param object data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns object[] An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Quote` object.)
     * </em>
     */
    QuoteApi.prototype.createMany = function (data) {
        if (data === void 0) { data = []; }
        var _method = "POST";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Quotes";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
        return result.map(function (instances) {
            return instances.map(function (instance) { return new Quote_1.Quote(instance); });
        });
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `Quote`.
     */
    QuoteApi.prototype.getModelName = function () {
        return "Quote";
    };
    QuoteApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Inject(auth_service_1.LoopBackAuth)),
        __param(2, core_1.Inject(search_params_1.JSONSearchParams)),
        __param(3, core_1.Optional()),
        __param(3, core_1.Inject(error_service_1.ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.LoopBackAuth, search_params_1.JSONSearchParams, error_service_1.ErrorHandler])
    ], QuoteApi);
    return QuoteApi;
}(base_service_1.BaseLoopBackApi));
exports.QuoteApi = QuoteApi;
//# sourceMappingURL=Quote.js.map