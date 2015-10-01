var Briskly = require('../src');
var chai = require('chai');
var req = require('request');
var expect = chai.expect;
describe('web server and route tests', function () {
    it('will start the web server', function (done) {
        Briskly.init()
            .then(function (started) {
            expect(started).to.be.true;
            done();
        })
            .catch(done);
    });
    it('will return five from the dummy route', function (done) {
        req.get('http://localhost:7331/five', function (err, res, body) {
            expect(body).to.equal('five');
            done();
        });
    });
    it('will return five from an inline-handler route', function (done) {
        req.get('http://localhost:7331/inline-five', function (err, res, body) {
            expect(body).to.equal('five');
            done();
        });
    });
});
//# sourceMappingURL=index.js.map