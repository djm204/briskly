"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fs = require('fs');
const path = require('path');
const server_1 = require('../server');
const cfg = require('briskly-json');
const log = require('ls-logger');
function wrapUserMarkup(userMarkup) {
    return `
    <!DOCTYPE html>
    <html>
    ${userMarkup}
    ${getUserScript()}
    <script src="scripts/cajon.js" data-main="scripts/briskly.js"></script>
    </html>
    `;
}
function getUserScript() {
    if (!cfg.json.hasOwnProperty('script'))
        return '';
    server_1.server.route({
        path: 'scripts/main.js',
        method: 'GET',
        handler: {
            file: path.join(process.cwd(), cfg.json.script)
        }
    });
    return `<script src="scripts/main.js"></script>`;
}
function bootstrapMain() {
    if (!cfg.json.hasOwnProperty('main')) {
        log.warn('No "main" found in briskly.json');
        return;
    }
    server_1.server.route({
        path: '/',
        method: 'GET',
        handler: (req, rep) => __awaiter(this, void 0, void 0, function* () {
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
    return __awaiter(this, void 0, void 0, function* () {
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