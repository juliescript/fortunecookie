"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MTI 2016 Jonathan Casarrubias
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDKModule }      from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDKModule.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
var search_params_1 = require('./services/core/search.params');
var error_service_1 = require('./services/core/error.service');
var auth_service_1 = require('./services/core/auth.service');
var logger_service_1 = require('./services/custom/logger.service');
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var real_time_1 = require('./services/core/real.time');
var User_1 = require('./services/custom/User');
var Quote_1 = require('./services/custom/Quote');
var SDKModule = (function () {
    function SDKModule() {
    }
    SDKModule.forRoot = function () {
        return {
            ngModule: SDKModule,
            providers: [
                real_time_1.RealTime,
                auth_service_1.LoopBackAuth,
                error_service_1.ErrorHandler,
                logger_service_1.LoggerService,
                search_params_1.JSONSearchParams,
                User_1.UserApi,
                Quote_1.QuoteApi
            ]
        };
    };
    SDKModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, http_1.HttpModule],
            declarations: [],
            exports: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], SDKModule);
    return SDKModule;
}());
exports.SDKModule = SDKModule;
__export(require('./models/index'));
__export(require('./services/index'));
__export(require('./lb.config'));
__export(require('./sockets/index'));
//# sourceMappingURL=index.js.map