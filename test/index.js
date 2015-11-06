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
                while (1) switch (_context.prev = _context.next) {
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
            }, _callee, this);
        }));
    });
    it('will a load a typical route', function (done) {
        get('five').then(function (body) {
            expect(body).to.equal('five');
            done();
        }).catch(done);
    });
    it('will load an inline-handler route', function (done) {
        get('inline-five').then(function (body) {
            expect(body).to.equal('five');
            done();
        }).catch(done);
    });
    it('will load an included route that expects a form body', function (done) {
        var values = { left: 2, right: 3 };
        post('maths/add', values).then(function (body) {
            expect(body).to.equal('5');
            done();
        }).catch(done);
    });
    it('will load an included route that takes query parameters', function (done) {
        get('maths/sub/10/6').then(function (body) {
            expect(body).to.equal('4');
            done();
        }).catch(done);
    });
    it('will load an included route that loads a module', function (done) {
        get('users').then(function (body) {
            var arr = JSON.parse(body);
            expect(Array.isArray(arr)).to.be.true;
            done();
        }).catch(done);
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