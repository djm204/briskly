import Types = require('../index.d.ts');
import Briskly = require('../src');
import chai = require('chai');
import req = require('request');
var expect = chai.expect;

describe('web server and route tests', () => {

    it('will start the web server', done => {
        Briskly.init()
            .then(started => {
                expect(started).to.be.true;
                done();
            })
            .catch(done);
    });

    it('will return five from the dummy route', done => {
        req.get('http://localhost:7331/five', (err, res, body) => {
            expect(body).to.equal('five');
            done();
        });
    });

    it('will return five from an inline-handler route', done => {
        req.get('http://localhost:7331/inline-five', (err, res, body) => {
            expect(body).to.equal('five');
            done();
        });
    })
});
