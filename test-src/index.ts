import * as Cfg from 'briskly-json';
import * as Briskly from '../src';
import * as chai from 'chai';
import * as req from 'request';
import json from '../src/json/read';
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

    it('will start the web server', async (done) => {
        var started = await Briskly.init();
        expect(started).to.be.true;
        done();
    });

    it('will a load a typical route', async (done) => {
        var body = await get('five');
        expect(body).to.equal('five');
        done();
    });

    it('will load an inline-handler route', async (done) => {
        var body = await get('inline-five');
        expect(body).to.equal('five');
        done();
    });

    it('will load an included route that expects a form body', async (done) => {
        var values = { left: 2, right: 3 };
        var body = await post('maths/add', values);
        expect(body).to.equal('5');
        done();
    });

    it('will load an included route that takes query parameters', async (done) => {
        var body = await get('maths/sub/10/6');
        expect(body).to.equal('4');
        done();
    });

    it('will load an included route that loads a module', async (done) => {
        var body = await get('users');
        var arr = JSON.parse(body);
        expect(Array.isArray(arr)).to.be.true;
        done();
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
    var hasLeadingSlash = route.slice(0, 1) === '/';

    if (hasLeadingSlash) return base + route.slice(1);
    return base + route;
}