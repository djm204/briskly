var Types = require('../../index.d.ts');
var json = require('./read');
var log = require('ls-logger');
var server_1 = require('../server');
var path = require('path');
var fs = require('fs');
var workingDirectory = process.env.PWD;
function parseRoutes() {
    if (!json.routes) {
        log.warn('No routes found in briskly.json');
        return;
    }
    for (var routePath in json.routes) {
        var route = json.routes[routePath];
        route.path = routePath;
        if (!route.method) {
            log.warn(routePath + ": No method found. Route ignored.");
            continue;
        }
        if (!route.handler) {
            log.warn(routePath + ": No handler found. Route ignored.");
            continue;
        }
        switch (getHandlerType(routePath)) {
            case 0 /* Function */:
                addFunctionRoute(route);
                break;
            case 2 /* File */:
                addFileRoute(route);
                break;
            case 1 /* Directory */:
                addDirectoryRoute(route);
                break;
            default: {
                log.error(routePath + ": Unable to determine route handler type. Route ignored.");
                // TODO
                break;
            }
        }
    }
}
function addFunctionRoute(route) {
    if (!isValidFunctionRoute(route))
        return;
    var method = route.method.toUpperCase();
    try {
        /**
         * This allows us to write in-line functions in briskly.json
         * Example:
         * ...
         * handler: function(request, reply) { reply(request.payload.left + request.payload.right); }
         *
         * However, this is fairly insane.
         * */
        var evalFunc = eval("(" + route.handler + ")");
        if (typeof evalFunc === 'function') {
            server_1.server.route({
                method: method,
                path: route.path,
                handler: evalFunc
            });
            log.info(route.path + ": Route added");
            return;
        }
    }
    catch (ex) { } // Couldn't eval the function. We're not too fussed here. It was worth a shot.      
    try {
        var routeHandler = require(handlerPath(route));
        server_1.server.route({
            method: method,
            path: route.path,
            handler: routeHandler
        });
        log.info(route.path + ": Route added");
    }
    catch (ex) {
        log.error(route.path + ": Unable to load function route handler. Route ignored.");
    }
}
function addFileRoute(route) {
    var handlerPath = handlerPath(route.handler);
    server_1.server.route({
        method: route.method.toUpperCase(),
        path: route.path,
        handler: function (request, reply) { return reply.file(handlerPath); }
    });
}
function addDirectoryRoute(route) {
    var handlerPath = handlerPath(route.handler);
    server_1.server.route({
        method: route.method.toUpperCase(),
        path: route.path + '/{param*}',
        handler: {
            directory: {
                path: handlerPath
            }
        }
    });
}
function handlerPath(route) {
    var handlerPath = path.resolve(path.join(workingDirectory, route.handler));
    return handlerPath;
}
function isValidFunctionRoute(route) {
    var routeHandler = require(handlerPath(route));
    if (typeof routeHandler !== 'function') {
        log.warn(route.path + ": Handler is not a function. Route ignored.");
        return false;
    }
    return true;
}
function getExtension(routePath) {
    var ext = path.extname(routePath) || '.js';
    return ext;
}
function getHandlerType(handler) {
    var handlerPath = handlerPath(handler);
    var extension = getExtension(handler);
    if (extension === '.js' || extension === '')
        return 0 /* Function */;
    try {
        var stat = fs.statSync(handlerPath);
        if (stat.isFile())
            return 2 /* File */;
        if (stat.isDirectory())
            return 1 /* Directory */;
        return 4 /* Unknown */;
    }
    catch (ex) {
        return 3 /* NotFound */;
    }
}
module.exports = parseRoutes;
//# sourceMappingURL=routes.js.map