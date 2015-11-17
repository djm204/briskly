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
var bootstrapMarkup = '';
function bootstrapMain() {
    var _this = this;

    server_1.server.route({
        path: '/',
        method: 'GET',
        handler: function handler(req, rep) {
            return __awaiter(_this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
                var markup, bootstrappedMarkup;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return getMainMarkup();

                            case 3:
                                markup = _context.sent;
                                bootstrappedMarkup = markup + '\n' + bootstrapMarkup;

                                rep.html(bootstrappedMarkup);
                                _context.next = 11;
                                break;

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context["catch"](0);

                                rep(_context.t0.message, 500);

                            case 11:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 8]]);
            }));
        }
    });
}
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
/**
 * Pre-optimization...
 * Cache the bootstrappd briskly markup
 */
function getMarkup() {
    return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee3() {
        var markupPath, markup;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        markupPath = path.join(__dirname, 'index.html');
                        _context3.next = 3;
                        return getFile(markupPath);

                    case 3:
                        markup = _context3.sent;
                        return _context3.abrupt("return", bootstrapMarkup = markup);

                    case 5:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
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