"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var read_1 = require('../json/read');
var BR = require('briskly-router');
var port = read_1.default.port || 1337;
exports.server = new BR.Router({ port: port });
function start(port) {
    return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return exports.server.start();

                    case 3:
                        return _context.abrupt('return', true);

                    case 6:
                        _context.prev = 6;
                        _context.t0 = _context['catch'](0);
                        return _context.abrupt('return', false);

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 6]]);
    }));
}
exports.start = start;
function stop(timeout) {
    return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return exports.server.stop();

                    case 3:
                        return _context2.abrupt('return', true);

                    case 6:
                        _context2.prev = 6;
                        _context2.t0 = _context2['catch'](0);
                        return _context2.abrupt('return', false);

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 6]]);
    }));
}
exports.stop = stop;
//# sourceMappingURL=index.js.map