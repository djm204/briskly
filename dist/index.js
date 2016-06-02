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
require("babel-polyfill");
var routes_1 = require('./json/routes');
var web = require('./server');
var log = require('ls-logger');
var defaultRoutes_1 = require('./server/defaultRoutes');
function init() {
    return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        var json, started;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // Initial parsing of briskly.json
                        json = require('./json/read');
                        // Parse briskly.json routes

                        routes_1.default();
                        // Load briskly default routes
                        defaultRoutes_1.default();
                        // Start the web server
                        _context.next = 5;
                        return web.start();

                    case 5:
                        started = _context.sent;

                        log.info("Web server started on port " + web.server.port);
                        return _context.abrupt("return", started);

                    case 8:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
exports.init = init;
//# sourceMappingURL=index.js.map