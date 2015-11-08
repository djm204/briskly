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
var read_1 = require('./read');
var log = require('ls-logger');
var server_1 = require('../server');
var path = require('path');
var fs = require('fs');
var workingDirectory = process.cwd();
function parseRoutes() {
    if (!read_1.default.routes) {
        log.warn('No routes found in briskly.json');
        return;
    }
    for (var routePath in read_1.default.routes) {
        var route = read_1.default.routes[routePath];
        if (routePath.toLowerCase() === 'include')
            continue;
        var firstCharIsSlash = routePath.slice(0, 1) === '/';
        route.path = `${firstCharIsSlash ? '' : '/'}${routePath}`;
        if (!route.method) {
            log.warn(`${routePath}: No method found. Route ignored.`);
            continue;
        }
        if (!route.handler) {
            log.warn(`${routePath}: No handler found. Route ignored.`);
            continue;
        }
        switch (getHandlerType(route)) {
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
                log.error(`${routePath}: Unable to determine route handler type. Route ignored.`);
                // TODO
                break;
            }
        }
    }
}
exports.default = parseRoutes;
function addFunctionRoute(route) {
    if (!isValidFunctionRoute(route)) {
        log.warn(`${route.path}: Handler is not a function. Route ignored.`);
        return;
    }
    var method = route.method.toUpperCase();
    try {
        /**
         * This allows us to write in-line functions in briskly.json
         * Example:
         * ...
         * handler: function(request, reply) { reply(request.payload.left + request.payload.right); }
         *
         * However, this is fairly insane.
         */
        var evalFunc = eval(`(${route.handler})`);
        if (typeof evalFunc === 'function') {
            server_1.server.route({
                method,
                path: route.path,
                handler: evalFunc
            });
            log.info(`${route.path}: Route added`);
            return;
        }
    }
    catch (ex) { } // Couldn't eval the function. We're not too fussed here. It was worth a shot.      
    try {
        var routeHandler = require(getHandlerPath(route));
        server_1.server.route({
            method,
            path: route.path,
            handler: routeHandler
        });
        log.info(`${route.path}: Route added`);
    }
    catch (ex) {
        log.error(`${route.path}: Unable to load function route handler. Route ignored.`);
    }
}
function addFileRoute(route) {
    var handlerPath = getHandlerPath(route);
    server_1.server.route({
        method: route.method.toUpperCase(),
        path: route.path,
        handler: (request, reply) => reply.file(handlerPath)
    });
    log.info(`${route.path}: File route added`);
}
function addDirectoryRoute(route) {
    var handlerPath = getHandlerPath(route);
    server_1.server.route({
        method: route.method.toUpperCase(),
        path: route.path + '/{...}',
        handler: {
            directory: handlerPath
        }
    });
    log.info(`${route.path}: Directory route added`);
}
function getHandlerPath(route) {
    var handlerPath = path.resolve(path.join(workingDirectory, route.handler));
    return handlerPath;
}
function isValidFunctionRoute(route) {
    try {
        var evalFunc = eval(`(${route.handler})`);
        if (typeof evalFunc === 'function')
            return true;
    }
    catch (ex) { }
    var routeHandler = require(getHandlerPath(route));
    return typeof routeHandler === 'function';
}
function getExtension(routePath) {
    var ext = path.extname(routePath) || '.js';
    return ext;
}
function getHandlerType(route) {
    var handlerPath = getHandlerPath(route);
    var extension = getExtension(route.handler);
    if (extension === '.js')
        return 0 /* Function */;
    if (isValidFunctionRoute(route))
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
//# sourceMappingURL=routes.js.map