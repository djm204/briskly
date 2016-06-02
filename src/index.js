"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
require("babel-polyfill");
const routes_1 = require('./json/routes');
const web = require('./server');
const log = require('ls-logger');
const defaultRoutes_1 = require('./server/defaultRoutes');
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        // Initial parsing of briskly.json
        var json = require('./json/read');
        // Parse briskly.json routes
        routes_1.default();
        // Load briskly default routes
        defaultRoutes_1.default();
        // Start the web server
        var started = yield web.start();
        log.info(`Web server started on port ${web.server.port}`);
        return started;
    });
}
exports.init = init;
//# sourceMappingURL=index.js.map