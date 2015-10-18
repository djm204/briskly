import Cfg = require('briskly-json');
import Briskly = require('../src');
import chai = require('chai');
import req = require('request');
import json = require('../src/json/read');
var expect = chai.expect;

describe('json parsing tests', () => {

    it('will parse briskly.json', () => {
        expect(typeof json === 'object');
        expect(json.routes).to.exist;
        expect(json.components).to.exist;
        expect(json.port).to.exist;
    });

    it('will load "include" routes', () => {
        expect(json.routes['users']).to.exist;
        expect(json.routes['maths/add']).to.exist;
    });
})

describe('web server and route tests', () => {

    it('will start the web server', done => {
        Briskly.init()
            .then(started => {
                expect(started).to.be.true;
                done();
            })
            .catch(done);
    });

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
function get(route: string) {
    
    var promise = new Promise<any>((resolve, reject) => {
        req.get(getRoute(route), (err, res, body) => {
            if (err) return reject(err);
            resolve(body);
        });
    });

    return promise;
}

function post(route: string, formData?: any) {
    if (formData) formData = { form: formData };

    var promise = new Promise<any>((resolve, reject) => {
        req.post(getRoute(route), formData, (err, res, body) => {
            if (err) return reject(err);
            resolve(body);
        });
    });

    return promise;
}

function getRoute(route: string) {
    var hasLeadingSlash = route.slice(0,1) === '/';
    
    if (hasLeadingSlash) return base + route.slice(1);
    return base + route; 
}