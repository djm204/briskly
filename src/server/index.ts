import Hapi = require('hapi');
import Promise = require('bluebird');

export var server = new Hapi.Server();

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

var webPort = 1337;