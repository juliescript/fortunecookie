"use strict";
/* tslint:disable */
var core_1 = require('@angular/core');
var lb_config_1 = require('../../lb.config');
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module LoggerService
* @license MTI
* @description
* Console Log wrapper that can be disabled in production mode
**/
var LoggerService = (function () {
    function LoggerService() {
    }
    LoggerService.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (lb_config_1.LoopBackConfig.debuggable())
            console.log.apply(console, args);
    };
    LoggerService.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (lb_config_1.LoopBackConfig.debuggable())
            console.info.apply(console, args);
    };
    LoggerService.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (lb_config_1.LoopBackConfig.debuggable())
            console.error.apply(console, args);
    };
    LoggerService.prototype.count = function (arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.count(arg);
    };
    LoggerService.prototype.group = function (arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.count(arg);
    };
    LoggerService.prototype.groupEnd = function () {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.groupEnd();
    };
    LoggerService.prototype.profile = function (arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.count(arg);
    };
    LoggerService.prototype.profileEnd = function () {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.profileEnd();
    };
    LoggerService.prototype.time = function (arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.count(arg);
    };
    LoggerService.prototype.timeEnd = function (arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.count(arg);
    };
    LoggerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LoggerService);
    return LoggerService;
}());
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map