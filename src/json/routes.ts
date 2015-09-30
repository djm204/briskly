import Types = require('../../index.d.ts')
import json = require('./read');
import log = require('ls-logger');
import { server } from '../server';
import path = require('path');

var workingDirectory = process.env.PWD;

function parseRoutes() {
    if (!json.routes) {
        log.warn('No routes found in briskly.json');
        return;
    }

    for (var routePath in json.routes) {
        var route: Types.Route = json.routes[routePath];
        if (!route.method) {
            log.warn(`${routePath}: No method found. Route ignored.`);
            continue;
        }

        if (!route.handler) {
            log.warn(`${routePath}: No handler found. Route ignored.`);
            continue;
        }
        var handlerPath = path.join(workingDirectory, route.handler);
        switch (getExtension(routePath)) {
            case '.js': {
                var handler = require(handlerPath);
                if (typeof handler !== 'function') {
                    log.warn(`${routePath}: Handler is not a function, but .js provided. Route ignored.`);
                    break;
                }

                server.route({
                    method: route.method,
                    path: routePath,
                    handler
                });

                log.info(`${route.method.toLocaleUpperCase() } ${routePath}`);
                break;
            }
            default: {
                // TODO
                break;
            }
        }
    }
}

function getExtension(routePath: string) {
    var ext = path.extname(routePath) || '.js';

    return ext;
}