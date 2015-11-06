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
var Briskly = require('../src');
var chai = require('chai');
var req = require('request');
var read_1 = require('../src/json/read');
var expect = chai.expect;
describe('json parsing tests', () => {
    it('will parse briskly.json', () => {
        expect(typeof read_1.default === 'object');
        expect(read_1.default.routes).to.exist;
        expect(read_1.default.components).to.exist;
        expect(read_1.default.port).to.exist;
    });
    it('will load "include" routes', () => {
        expect(read_1.default.routes['users']).to.exist;
        expect(read_1.default.routes['maths/add']).to.exist;
    });
});
describe('web server and route tests', () => {
    it('will start the web server', (done) => __awaiter(this, void 0, Promise, function* () {
        var started = yield Briskly.init();
        expect(started).to.be.true;
        done();
    }));
    it('will a load a typical route', done => {
        get('five')
            .then(body => {
            expect(body).to.equal('five');
            done();
        }).catch(done);
    });
    it('will load an inline-handler route', done => {
        get('inline-five')
            .then(body => {
            expect(body).to.equal('five');
            done();
        }).catch(done);
    });
    it('will load an included route that expects a form body', done => {
        var values = { left: 2, right: 3 };
        post('maths/add', values)
            .then(body => {
            expect(body).to.equal('5');
            done();
        }).catch(done);
    });
    it('will load an included route that takes query parameters', done => {
        get('maths/sub/10/6')
            .then(body => {
            expect(body).to.equal('4');
            done();
        }).catch(done);
    });
    it('will load an included route that loads a module', done => {
        get('users')
            .then(body => {
            var arr = JSON.parse(body);
            expect(Array.isArray(arr)).to.be.true;
            done();
        }).catch(done);
    });
});
var base = 'http://localhost:7331/';
function get(route) {
    var promise = new Promise((resolve, reject) => {
        req.get(getRoute(route), (err, res, body) => {
            if (err)
                return reject(err);
            resolve(body);
        });
    });
    return promise;
}
function post(route, formData) {
    if (formData)
        formData = { form: formData };
    var promise = new Promise((resolve, reject) => {
        req.post(getRoute(route), formData, (err, res, body) => {
            if (err)
                return reject(err);
            resolve(body);
        });
    });
    return promise;
}
function getRoute(route) {
    var hasLeadingSlash = route.slice(0, 1) === '/';
    if (hasLeadingSlash)
        return base + route.slice(1);
    return base + route;
}
//# sourceMappingURL=index.js.map