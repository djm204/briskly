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
var routes_1 = require('./json/routes');
var web = require('./server');
var log = require('ls-logger');
require('babel-polyfill');
function init() {
    return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
        var json, webStart, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
                case 0:
                    // Initial parsing of briskly.json
                    json = require('./json/read');
                    // Parse briskly.json routes

                    routes_1.default();
                    // Start the web server
                    webStart = web.start();
                    _context.next = 5;
                    return webStart;

                case 5:
                    result = _context.sent;

                    log.info('Web server started');
                    return _context.abrupt("return", webStart);

                case 8:
                case "end":
                    return _context.stop();
            }
        }, _callee, this);
    }));
}
exports.init = init;
//# sourceMappingURL=index.js.map