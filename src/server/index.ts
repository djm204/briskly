import Hapi = require('hapi');
import Promise = require('bluebird');
import log = require('ls-logger');
import json = require('../json/read');
var inert = require('insert');

export var server = new Hapi.Server();
var webPort = json.port || 1337;

server.register(inert, err => {
    if (err) log.error('Unknown to load "inert" middleware');
});

export function setPort(port?: number) {
    webPort = port;
}

export function start(port?: number) {
    var promise = new Promise<boolean>((resolve, reject) => {
        server.start(err => {
            if (err) return reject(err);
            resolve(true);
        })
    });

    return promise;
}

export function stop(timeout?: number) {
    var opts = timeout ? { timeout } : null;
    var promise = new Promise<boolean>(resolve => {
        server.stop(opts, () => {
            resolve(true);
        });
    });
    
    return promise;
}
