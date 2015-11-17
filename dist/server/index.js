"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
                resolve(value);
            });
        }
        function onfulfill(value) {
            try {
                step("next", value);
            } catch (e) {
                reject(e);
            }
        }
        function onreject(value) {
            try {
                step("throw", value);
            } catch (e) {
                reject(e);
            }
        }
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
exports.server = new BR.Router({ port: port });
function start(port) {
    return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return exports.server.start();

                    case 3:
                        return _context.abrupt("return", true);

                    case 6:
                        _context.prev = 6;
                        _context.t0 = _context["catch"](0);
                        return _context.abrupt("return", false);

                    case 9:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 6]]);
    }));
}
exports.start = start;
function stop(timeout) {
    return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return exports.server.stop();

                    case 3:
                        return _context2.abrupt("return", true);

                    case 6:
                        _context2.prev = 6;
                        _context2.t0 = _context2["catch"](0);
                        return _context2.abrupt("return", false);

                    case 9:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 6]]);
    }));
}
exports.stop = stop;
//# sourceMappingURL=index.js.map