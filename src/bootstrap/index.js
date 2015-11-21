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
var fs = require('fs');
var path = require('path');
var server_1 = require('../server');
var cfg = require('briskly-json');
var log = require('ls-logger');
function wrapUserMarkup(userMarkup) {
    return `
    <!DOCTYPE html>
    <html>
    ${userMarkup}
    <script src="scripts/cajon.js" data-main="scripts/briskly.js"></script>
    </html>
    `;
}
function bootstrapMain() {
    if (!cfg.json.hasOwnProperty('main')) {
        log.warn('No "main" found in briskly.json');
        return;
    }
    server_1.server.route({
        path: '/',
        method: 'GET',
        handler: (req, rep) => __awaiter(this, void 0, Promise, function* () {
            try {
                var markup = yield getMainMarkup();
                rep.html(wrapUserMarkup(markup));
            }
            catch (ex) {
                rep(ex.message, 500);
            }
        })
    });
    log.info('/: Route added');
}
exports.default = bootstrapMain;
function getMainMarkup() {
    return __awaiter(this, void 0, Promise, function* () {
        var main = cfg.json.main;
        var cwd = process.cwd();
        var mainPath = path.join(cwd, main);
        var mainMarkup = yield getFile(mainPath);
        return mainMarkup;
    });
}
function getFile(filepath) {
    var promise = new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf8', (error, content) => {
            if (error)
                return reject('Unable to retrieve file: ' + filepath);
            resolve(content);
        });
    });
    return promise;
}
//# sourceMappingURL=index.js.map