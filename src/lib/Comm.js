"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Comm = /** @class */ (function () {
    function Comm(url) {
        this.url = url;
        this.data = {};
        this.namespace = null;
        this.events = {
            beforeSend: [],
            progress: [],
            response: [],
            error: [],
            connectionError: [],
            success: [],
            validationErrors: [],
            finish: []
        };
        this.method = 'POST';
    }
    Comm.prototype.on = function (event, callback) {
        if (!Array.isArray(this.events[event])) {
            console.error('Unknow event: ' + event);
            console.log(this.events);
        }
        else {
            this.events[event].push(callback);
        }
    };
    Comm.prototype.callEvent = function (event, data) {
        this.events[event].map(function (el) { return el(data); });
    };
    Comm.prototype.setData = function (data) {
        this.data = data;
    };
    Comm.prototype.appendFormData = function (FormData, data, name) {
        var _this = this;
        if (name === void 0) { name = ''; }
        if (data instanceof FileList) {
            for (var i = 0; i < data.length; i++) {
                // get item
                var file = data.item(i);
                FormData.append(name + '[]', file);
            }
            return;
        }
        if (Object.prototype.toString.call(data) == '[object File]') {
            FormData.append(name, data);
            return;
        }
        if (typeof data === 'object' && data != null) {
            Object.entries(data).map(function (_a) {
                var index = _a[0], value = _a[1];
                if (name == '') {
                    _this.appendFormData(FormData, value, index);
                }
                else {
                    //test for array in field name
                    var openBracket = index.indexOf('[');
                    var newName = name + '[' + index + ']';
                    if (openBracket != -1) {
                        newName = name + '[' + index.slice(0, openBracket) + ']' + index.slice(openBracket);
                    }
                    _this.appendFormData(FormData, value, newName);
                }
            });
        }
        else {
            //if (data && data != null) {
            FormData.append(name, data == null ? '' : data);
            //}
        }
    };
    Comm.prototype.prepareData = function () {
        var data = {};
        if (this.namespace) {
            data[this.namespace] = this.data;
        }
        else {
            data = this.data;
        }
        return data;
    };
    Comm.prototype.debugError = function (error) {
        var errorWindow = window.open('', '', 'width=800,height=600');
        errorWindow.document.write('<pre>' + error + '</pre>');
        errorWindow.focus();
    };
    Comm.prototype.send = function () {
        var _this = this;
        var data = this.prepareData();
        var formData = new FormData();
        if (this.method == 'POST') {
            this.appendFormData(formData, data);
        }
        this.callEvent('beforeSend', data);
        var xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function (event) {
            _this.callEvent('progress', {
                loaded: event.loaded,
                percent: Math.round(event.loaded / event.total * 100)
            });
        };
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var exceptionOccured = false;
                    var data_1;
                    try {
                        _this.callEvent('response', xhr.response);
                        data_1 = JSON.parse(xhr.response);
                    }
                    catch (e) {
                        exceptionOccured = true;
                        _this.debugError(e.message + '<hr />' + xhr.response);
                        _this.callEvent('error', xhr.response);
                    }
                    if (!exceptionOccured) {
                        if (data_1.errors === undefined) {
                            _this.callEvent('success', data_1);
                        }
                        else {
                            _this.callEvent('validationErrors', data_1);
                        }
                    }
                }
                else {
                    _this.debugError(xhr.status + '<hr />');
                    _this.callEvent('connectionError', xhr.response);
                }
                _this.callEvent('finish', xhr);
            }
        };
        xhr.open(this.method, this.url, true);
        if (this.method == 'POST') {
            xhr.send(formData);
        }
        else if (this.method == 'GET') {
            xhr.send();
        }
        else if (this.method == 'PUT') {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    };
    Comm.__preparePromise = function (method, url, data, callback) {
        return new Promise(function (resolve, reject) {
            var comm = new Comm(url);
            comm.method = method;
            if (callback) {
                comm.on('success', callback);
            }
            comm.on('success', function (data) { return resolve(data); });
            comm.on('validationErrors', function (data) { return reject(data); });
            comm.on('connectionError', function (data) { return reject(data); });
            comm.on('error', function (data) { return reject(data); });
            comm.setData(data);
            comm.send();
        });
    };
    Comm._post = function (url, data, callback) {
        if (callback === void 0) { callback = null; }
        return Comm.__preparePromise('POST', url, data, callback);
    };
    Comm._get = function (url, data, callback) {
        if (callback === void 0) { callback = null; }
        return Comm.__preparePromise('GET', url, data, callback);
    };
    Comm._put = function (url, data, callback) {
        if (callback === void 0) { callback = null; }
        return Comm.__preparePromise('PUT', url, data, callback);
    };
    return Comm;
}());
exports.default = Comm;
