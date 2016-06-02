"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const read_1 = require('../json/read');
const BR = require('briskly-router');
var port = read_1.default.port || 1337;
exports.server = new BR.Router({ port: port });
function start(port) {
    return __awaiter(this, void 0, void 0, function* () {
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
    return __awaiter(this, void 0, void 0, function* () {
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