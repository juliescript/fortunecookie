"use strict";
var core_1 = require("@angular/core");
var index_1 = require('./shared/sdk/models/index');
var index_2 = require('./shared/sdk/services/index');
var AppComponent = (function () {
    function AppComponent(quoteApi) {
        this.quoteApi = quoteApi;
        this.quote = new index_1.Quote();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.totalQuotes = this.quoteApi.count().subscribe();
        console.log(this.totalQuotes);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
            providers: [index_2.QuoteApi]
        }), 
        __metadata('design:paramtypes', [index_2.QuoteApi])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map