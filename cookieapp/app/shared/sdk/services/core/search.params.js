"use strict";
/* tslint:disable */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module JSONSearchParams
* @license MTI
* @description
* JSON Parser and Wrapper for the Angular2 URLSearchParams
* This module correctly encodes a json object into a query string and then creates
* an instance of the URLSearchParams component for later use in HTTP Calls
**/
var JSONSearchParams = (function () {
    function JSONSearchParams() {
    }
    JSONSearchParams.prototype.setJSON = function (obj) {
        this._usp = new http_1.URLSearchParams(this._JSON2URL(obj, false));
    };
    JSONSearchParams.prototype.getURLSearchParams = function () {
        return this._usp;
    };
    JSONSearchParams.prototype._JSON2URL = function (obj, parent) {
        var parts = [];
        for (var key in obj)
            parts.push(this._parseParam(key, obj[key], parent));
        return parts.join('&');
    };
    JSONSearchParams.prototype._parseParam = function (key, value, parent) {
        if (typeof value !== 'object' && typeof value !== 'array') {
            return parent ? parent + '[' + key + ']=' + value
                : key + '=' + value;
        }
        else if (typeof value === 'object' || typeof value === 'array') {
            return parent ? this._JSON2URL(value, parent + '[' + key + ']')
                : this._JSON2URL(value, key);
        }
        else {
            throw new Error('Unexpected Type');
        }
    };
    JSONSearchParams = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], JSONSearchParams);
    return JSONSearchParams;
}());
exports.JSONSearchParams = JSONSearchParams;
//# sourceMappingURL=search.params.js.map