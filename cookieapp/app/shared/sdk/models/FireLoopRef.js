"use strict";
var Subject_1 = require('rxjs/Subject');
var Observable_1 = require('rxjs/Observable');
var FireLoopRef = (function () {
    function FireLoopRef(name, socket, parent, current) {
        if (parent === void 0) { parent = null; }
        if (current === void 0) { current = null; }
        this.childs = {};
        this.observables = {};
        this.name = name;
        this.current = current;
        this.parent = parent;
        this.socket = socket;
        return this;
    }
    FireLoopRef.prototype.operation = function (event, data) {
        var _this = this;
        var id = Math.floor(Math.random() * 100800) *
            Math.floor(Math.random() * 100700) *
            Math.floor(Math.random() * 198500);
        var subject = new Subject_1.Subject();
        var config = {
            id: id,
            data: data,
            current: this.current,
            parent: this.parent && this.parent.instance ? this.parent.instance : null
        };
        if (!this.parent || (this.parent && this.current)) {
            this.socket.emit(this.name + "." + event, config);
        }
        else {
            var interval_1 = setInterval(function () {
                if (_this.current) {
                    config.current = _this.current;
                    _this.socket.emit(_this.name + "." + event, config);
                    clearInterval(interval_1);
                }
            }, 500);
        }
        this.socket.on(this.name + ".value.result." + id, function (res) {
            return subject.next(res.error ? Observable_1.Observable.throw(res.error) : res);
        });
        return subject.asObservable();
    };
    FireLoopRef.prototype.upsert = function (data) {
        return this.operation('upsert', data);
    };
    FireLoopRef.prototype.create = function (data) {
        return this.operation('create', data);
    };
    FireLoopRef.prototype.remove = function (data) {
        return this.operation('remove', data);
    };
    FireLoopRef.prototype.on = function (event, filter) {
        var _this = this;
        if (filter === void 0) { filter = { limit: 100, order: 'id DESC' }; }
        event = this.name + "." + event;
        if (this.observables[event]) {
            return this.observables[event];
        }
        var subject = new Subject_1.Subject();
        if (event.match(/(value|change|stats)/)) {
            this.pull(event, filter, subject);
        }
        // Listen for broadcast announces
        this.socket.on(
        // When there is a broadcast announce
        event + ".broadcast.announce", 
        // We send a request containing the filtering options
        function () { return _this.socket.emit(event + ".broadcast.request", filter); });
        // Once processed our request will return a unique result
        this.socket.on(event + ".broadcast", function (res) { return subject.next(res); });
        this.observables[event] = subject.asObservable();
        return this.observables[event];
    };
    FireLoopRef.prototype.stats = function (filter) {
        var _this = this;
        var event = this.name + ".stats";
        if (this.observables[event]) {
            return this.observables[event];
        }
        var subject = new Subject_1.Subject();
        this.pull(event, filter, subject);
        // Listen for broadcast announces
        this.socket.on(
        // When there is a broadcast announce
        event + ".broadcast.announce", 
        // We send a request containing the filtering options
        function () { return _this.socket.emit(event + ".broadcast.request", filter); });
        // Once processed our request will return a unique result
        this.socket.on(event + ".broadcast", function (res) { return subject.next(res); });
        this.observables[event] = subject.asObservable();
        return this.observables[event];
    };
    FireLoopRef.prototype.pull = function (event, filter, subject) {
        this.socket.emit(event + ".pull.request", filter);
        this.socket.on(event + ".pull.requested", function (res) { return subject.next(res); });
    };
    FireLoopRef.prototype.make = function (instance) {
        this.instance = instance;
        return this;
    };
    FireLoopRef.prototype.child = function (name) {
        var _this = this;
        if (!this.parent) {
            var childName_1 = this.name + "." + name;
            if (this.childs[childName_1]) {
                return this.childs[childName_1];
            }
            this.socket.emit(this.name + ".relation.request", { relation: name });
            this.socket.on(this.name + ".relation.request.result", function (Model) {
                _this.childs[childName_1].current = Model;
            });
            this.childs[childName_1] = new FireLoopRef(childName_1, this.socket, this);
            return this.childs[childName_1];
        }
        else {
            console.warn('Only 1 child level is supported');
        }
    };
    return FireLoopRef;
}());
exports.FireLoopRef = FireLoopRef;
//# sourceMappingURL=FireLoopRef.js.map