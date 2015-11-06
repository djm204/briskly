var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var read_1 = require('../json/read');
var BR = require('briskly-router');
var port = read_1.default.port || 1337;
exports.server = new BR.Router({ port });
function start(port) {
    return __awaiter(this, void 0, Promise, function* () {
        try {
            yield exports.server.start();
            return true;
        }
        catch (ex) {
            return false;
        }
    });
}
exports.start = start;
function stop(timeout) {
    return __awaiter(this, void 0, Promise, function* () {
        try {
            yield exports.server.stop();
            return true;
        }
        catch (ex) {
            return false;
        }
    });
}
exports.stop = stop;
//# sourceMappingURL=index.js.map