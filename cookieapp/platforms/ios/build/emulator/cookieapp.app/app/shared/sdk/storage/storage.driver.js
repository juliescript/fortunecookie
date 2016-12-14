"use strict";
/* tslint:disable */
var AppSettings = require('application-settings');
var StorageDriver = (function () {
    function StorageDriver() {
    }
    StorageDriver.set = function (key, value) {
        AppSettings.setString(key, String(value));
    };
    StorageDriver.get = function (key) {
        return AppSettings.getString(key);
    };
    StorageDriver.remove = function (key) {
        if (AppSettings.hasKey(key)) {
            AppSettings.remove(key);
        }
        else {
            console.log('Trying to remove unexisting key: ', key);
        }
    };
    return StorageDriver;
}());
exports.StorageDriver = StorageDriver;
//# sourceMappingURL=storage.driver.js.map