import * as Cfg from 'briskly-json';
import json from './read';
import * as log from 'ls-logger';
import { server } from '../server';
import * as path from 'path';
import * as fs from 'fs';
export { parseRoutes as default };

var workingDirectory = process.cwd();

function parseRoutes() {
    if (!json.routes) {
        log.warn('No routes found in briskly.json');
        return;
    }

    for (var routePath in json.routes) {
        var route: Cfg.Route = json.routes[routePath];
        if (routePath.toLowerCase() === 'include') continue;
        var firstCharIsSlash = routePath.slice(0,1) === '/';
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
            case Handler.Function:
                addFunctionRoute(route);
                break;

            case Handler.File:
                addFileRoute(route);
                break;

            case Handler.Directory:
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

function addFunctionRoute(route: Cfg.Route) {
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
         * */
        var evalFunc = eval(`(${route.handler})`);
        if (typeof evalFunc === 'function') {
            server.route({
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

        server.route({
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

function addFileRoute(route: Cfg.Route) {
    var handlerPath = getHandlerPath(route);

    server.route({
        method: route.method.toUpperCase(),
        path: route.path,
        handler: (request, reply) => reply.file(handlerPath)
    });

    log.info(`${route.path}: File route added`);
}

function addDirectoryRoute(route: Cfg.Route) {
    var handlerPath = getHandlerPath(route);

    server.route({
        method: route.method.toUpperCase(),
        path: route.path + '/{param*}',
        handler: {
            directory: handlerPath
        }
    });

    log.info(`${route.path}: Directory route added`);
}

function getHandlerPath(route: Cfg.Route) {
    var handlerPath = path.resolve(path.join(workingDirectory, route.handler));
    return handlerPath;
}

function isValidFunctionRoute(route: Cfg.Route) {
    try {
        var evalFunc = eval(`(${route.handler})`);
        if (typeof evalFunc === 'function')
            return true;
    } catch (ex) { }
    
    var routeHandler = require(getHandlerPath(route));
    return typeof routeHandler === 'function';
}

function getExtension(routePath: string) {
    var ext = path.extname(routePath) || '.js';

    return ext;
}

function getHandlerType(route: Cfg.Route): Handler {
    var handlerPath = getHandlerPath(route);

    var extension = getExtension(route.handler);
    if (extension === '.js')
        return Handler.Function;

    if (isValidFunctionRoute(route))
        return Handler.Function

    try {
        var stat = fs.statSync(handlerPath);

        if (stat.isFile()) return Handler.File;
        if (stat.isDirectory()) return Handler.Directory;

        return Handler.Unknown;
    } catch (ex) {
        return Handler.NotFound;
    }
}

const enum Handler {
    Function,
    Directory,
    File,
    NotFound,
    Unknown
}