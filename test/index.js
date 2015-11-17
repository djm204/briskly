"use strict";

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

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
var Briskly = require('../src');
var chai = require('chai');
var req = require('request');
var read_1 = require('../src/json/read');
var expect = chai.expect;
describe('json parsing tests', function () {
    it('will parse briskly.json', function () {
        expect(_typeof(read_1.default) === 'object');
        expect(read_1.default.routes).to.exist;
        expect(read_1.default.components).to.exist;
        expect(read_1.default.port).to.exist;
    });
    it('will load "include" routes', function () {
        expect(read_1.default.routes['users']).to.exist;
        expect(read_1.default.routes['maths/add']).to.exist;
    });
});
describe('web server and route tests', function () {
    it('will start the web server', function (done) {
        return __awaiter(undefined, void 0, Promise, regeneratorRuntime.mark(function _callee() {
            var started;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return Briskly.init();

                        case 2:
                            started = _context.sent;

                            expect(started).to.be.true;
                            done();

                        case 5:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    });
    it('will a load a typical route', function (done) {
        return __awaiter(undefined, void 0, Promise, regeneratorRuntime.mark(function _callee2() {
            var body;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return get('five');

                        case 2:
                            body = _context2.sent;

                            expect(body).to.equal('five');
                            done();

                        case 5:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));
    });
    it('will load an inline-handler route', function (done) {
        return __awaiter(undefined, void 0, Promise, regeneratorRuntime.mark(function _callee3() {
            var body;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return get('inline-five');

                        case 2:
                            body = _context3.sent;

                            expect(body).to.equal('five');
                            done();

                        case 5:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));
    });
    it('will load an included route that expects a form body', function (done) {
        return __awaiter(undefined, void 0, Promise, regeneratorRuntime.mark(function _callee4() {
            var values, body;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            values = { left: 2, right: 3 };
                            _context4.next = 3;
                            return post('maths/add', values);

                        case 3:
                            body = _context4.sent;

                            expect(body).to.equal('5');
                            done();

                        case 6:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));
    });
    it('will load an included route that takes query parameters', function (done) {
        return __awaiter(undefined, void 0, Promise, regeneratorRuntime.mark(function _callee5() {
            var body;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.prev = 0;
                            _context5.next = 3;
                            return get('maths/sub/12/6');

                        case 3:
                            body = _context5.sent;

                            expect(body).to.equal('4');
                            done();
                            _context5.next = 11;
                            break;

                        case 8:
                            _context5.prev = 8;
                            _context5.t0 = _context5["catch"](0);

                            done(_context5.t0);

                        case 11:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, this, [[0, 8]]);
        }));
    });
    it('will load an included route that loads a module', function (done) {
        return __awaiter(undefined, void 0, Promise, regeneratorRuntime.mark(function _callee6() {
            var body, arr;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return get('users');

                        case 2:
                            body = _context6.sent;
                            arr = JSON.parse(body);

                            expect(Array.isArray(arr)).to.be.true;
                            done();

                        case 6:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));
    });
});
var base = 'http://localhost:7331/';
function get(route) {
    var promise = new Promise(function (resolve, reject) {
        req.get(getRoute(route), function (err, res, body) {
            if (err) return reject(err);
            resolve(body);
        });
    });
    return promise;
}
function post(route, formData) {
    if (formData) formData = { form: formData };
    var promise = new Promise(function (resolve, reject) {
        req.post(getRoute(route), formData, function (err, res, body) {
            if (err) return reject(err);
            resolve(body);
        });
    });
    return promise;
}
function getRoute(route) {
    var hasLeadingSlash = route.slice(0, 1) === '/';
    if (hasLeadingSlash) return base + route.slice(1);
    return base + route;
}
//# sourceMappingURL=index.js.map