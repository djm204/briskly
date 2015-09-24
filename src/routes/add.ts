import Hapi = require('hapi');
import { server } from '../server';

export function get(route: string) {
    return (handler: Hapi.ISessionHandler | Hapi.IRouteHandlerConfig) => {
        server.route({
            method: 'GET',
            path: route,
            handler
        });
    }
}

export function post(route: string) {
    return (handler: Hapi.ISessionHandler | Hapi.IRouteHandlerConfig) => {
        server.route({
            method: 'POST',
            path: route,
            handler
        });
    }
}

export function put(route: string) {
    return (handler: Hapi.ISessionHandler | Hapi.IRouteHandlerConfig) => {
        server.route({
            method: 'PUT',
            path: route,
            handler
        });
    }
}

export function del(route: string) {
    return (handler: Hapi.ISessionHandler | Hapi.IRouteHandlerConfig) => {
        server.route({
            method: 'DELETE',
            path: route,
            handler
        });
    }
}