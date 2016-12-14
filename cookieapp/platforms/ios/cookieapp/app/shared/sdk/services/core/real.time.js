"use strict";
var core_1 = require('@angular/core');
var io_service_1 = require('./io.service');
var search_params_1 = require('./search.params');
var auth_service_1 = require('./auth.service');
var FireLoop_1 = require('../../models/FireLoop');
var RealTime = (function () {
    function RealTime(auth, searchParams) {
        this.auth = auth;
        this.searchParams = searchParams;
        var token = this.auth.getToken();
        this.IO = new io_service_1.IO(token);
        this.FireLoop = new FireLoop_1.FireLoop(token);
    }
    RealTime = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(auth_service_1.LoopBackAuth)),
        __param(1, core_1.Inject(search_params_1.JSONSearchParams)), 
        __metadata('design:paramtypes', [auth_service_1.LoopBackAuth, search_params_1.JSONSearchParams])
    ], RealTime);
    return RealTime;
}());
exports.RealTime = RealTime;
//# sourceMappingURL=real.time.js.map