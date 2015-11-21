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
var routes_1 = require('./json/routes');
var web = require('./server');
var log = require('ls-logger');
var defaultRoutes_1 = require('./server/defaultRoutes');
require('babel-polyfill');
function init() {
    return __awaiter(this, void 0, Promise, function* () {
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