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
var fs = require('fs');
var path = require('path');
var server_1 = require('../server');
var cfg = require('briskly-json');
var log = require('ls-logger');
function wrapUserMarkup(userMarkup) {
    return "\n    <!DOCTYPE html>\n    <html>\n    " + userMarkup + "\n    " + getUserScript() + "\n    <script src=\"scripts/cajon.js\" data-main=\"scripts/briskly.js\"></script>\n    </html>\n    ";
}
function getUserScript() {
    if (!cfg.json.hasOwnProperty('script')) return '';
    return "<script src=\"" + cfg.json.script + "\"></script>";
}
function bootstrapMain() {
    var _this = this;

    if (!cfg.json.hasOwnProperty('main')) {
        log.warn('No "main" found in briskly.json');
        return;
    }
    server_1.server.route({
        path: '/',
        method: 'GET',
        handler: function handler(req, rep) {
            return __awaiter(_this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
                var markup;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return getMainMarkup();

                            case 3:
                                markup = _context.sent;

                                rep.html(wrapUserMarkup(markup));
                                _context.next = 10;
                                break;

                            case 7:
                                _context.prev = 7;
                                _context.t0 = _context["catch"](0);

                                rep(_context.t0.message, 500);

                            case 10:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 7]]);
            }));
        }
    });
    log.info('/: Route added');
}
exports.default = bootstrapMain;
function getMainMarkup() {
    return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee2() {
        var main, cwd, mainPath, mainMarkup;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        main = cfg.json.main;
                        cwd = process.cwd();
                        mainPath = path.join(cwd, main);
                        _context2.next = 5;
                        return getFile(mainPath);

                    case 5:
                        mainMarkup = _context2.sent;
                        return _context2.abrupt("return", mainMarkup);

                    case 7:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
}
function getFile(filepath) {
    var promise = new Promise(function (resolve, reject) {
        fs.readFile(filepath, 'utf8', function (error, content) {
            if (error) return reject('Unable to retrieve file: ' + filepath);
            resolve(content);
        });
    });
    return promise;
}
//# sourceMappingURL=index.js.map