import Types = require('../../index.d.ts');
import Handler = Types.Handler;
import Route = Types.Route;

import json = require('./read');
import log = require('ls-logger');
import { server } from '../server';
import path = require('path');
import fs = require('fs');
export = parseRoutes;

var workingDirectory = process.env.PWD;

function parseRoutes() {
    if (!json.routes) {
        log.warn('No routes found in briskly.json');
        return;
    }

    for (var routePath in json.routes) {
        var route: Types.Route = json.routes[routePath];
        route.path = routePath;

        if (!route.method) {
            log.warn(`${routePath}: No method found. Route ignored.`);
            continue;
        }

        if (!route.handler) {
            log.warn(`${routePath}: No handler found. Route ignored.`);
            continue;
        }

        switch (getHandlerType(routePath)) {
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

function addFunctionRoute(route: Route) {
    if (!isValidFunctionRoute(route)) return;
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
        var routeHandler = require(handlerPath(route));

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

function addFileRoute(route: Route) {
    var handlerPath = handlerPath(route.handler);
    
    server.route({
        method: route.method.toUpperCase(),
        path: route.path,
        handler: (request, reply) => reply.file(handlerPath)
    });    
}

function addDirectoryRoute(route: Route) {
    var handlerPath = handlerPath(route.handler);
    
    server.route({
        method: route.method.toUpperCase(),
        path: route.path + '/{param*}',
        handler: {
            directory: {
                path: handlerPath
            }
        } 
    })
}

function handlerPath(route: Route) {
    var handlerPath = path.resolve(path.join(workingDirectory, route.handler));
    return handlerPath;
}

function isValidFunctionRoute(route: Route) {
    var routeHandler = require(handlerPath(route));
    if (typeof routeHandler !== 'function') {
        log.warn(`${route.path}: Handler is not a function. Route ignored.`);
        return false;
    }

    return true;
}

function getExtension(routePath: string) {
    var ext = path.extname(routePath) || '.js';

    return ext;
}

function getHandlerType(handler: string): Handler {
    var handlerPath = handlerPath(handler);

    var extension = getExtension(handler);
    if (extension === '.js' || extension === '')
        return Handler.Function;

    try {
        var stat = fs.statSync(handlerPath);

        if (stat.isFile()) return Handler.File;
        if (stat.isDirectory()) return Handler.Directory;

        return Types.Handler.Unknown;
    } catch (ex) {
        return Types.Handler.NotFound;
    }
} 