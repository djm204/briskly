var Hapi = require('hapi');
var Promise = require('bluebird');
var log = require('ls-logger');
var inert = require('insert');
exports.server = new Hapi.Server();
exports.server.register(inert, function (err) {
    if (err)
        log.error('Unknown to load "inert" middleware');
});
function setPort(port) {
    webPort = port;
}
exports.setPort = setPort;
function start(port) {
    var promise = new Promise(function (resolve, reject) {
        exports.server.start(function (err) {
            if (err)
                return reject(err);
            resolve(true);
        });
    });
    return promise;
}
exports.start = start;
function stop(timeout) {
    var opts = timeout ? { timeout: timeout } : null;
    var promise = new Promise(function (resolve) {
        exports.server.stop(opts, function () {
            resolve(true);
        });
    });
    return promise;
}
exports.stop = stop;
var webPort = 1337;
//# sourceMappingURL=index.js.map