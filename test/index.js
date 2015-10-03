var Briskly = require('../src');
var chai = require('chai');
var req = require('request');
var json = require('../src/json/read');
var expect = chai.expect;
describe('json parsing tests', function () {
    it('will parse briskly.json', function () {
        expect(typeof json === 'object');
        expect(json.routes).to.exist;
        expect(json.components).to.exist;
        expect(json.port).to.exist;
    });
    it('will load "include" routes', function () {
        expect(json.routes['users']).to.exist;
        expect(json.routes['maths/add']).to.exist;
    });
});
describe('web server and route tests', function () {
    it('will start the web server', function (done) {
        Briskly.init()
            .then(function (started) {
            expect(started).to.be.true;
            done();
        })
            .catch(done);
    });
    it('will a load a typical route', function (done) {
        get('five')
            .then(function (body) {
            expect(body).to.equal('five');
            done();
        }).catch(done);
    });
    it('will load an inline-handler route', function (done) {
        get('inline-five')
            .then(function (body) {
            expect(body).to.equal('five');
            done();
        }).catch(done);
    });
    it('will load an included route that expects a form body', function (done) {
        var values = { left: 2, right: 3 };
        post('maths/add', values)
            .then(function (body) {
            expect(body).to.equal('5');
            done();
        }).catch(done);
    });
    it('will load an included route that takes query parameters', function (done) {
        get('maths/sub/10/6')
            .then(function (body) {
            expect(body).to.equal('4');
            done();
        }).catch(done);
    });
    it('will load an included route that loads a module', function (done) {
        get('users')
            .then(function (body) {
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
    var promise = new Promise(function (resolve, reject) {
        req.post(getRoute(route), formData, function (err, res, body) {
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