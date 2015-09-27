import Hapi = require('hapi');
import { server } from '../server';

export function get(route: string, handler: Hapi.ISessionHandler | Hapi.IRouteFailFunction) {
    server.route({
        method: 'GET',
        path: route,
        handler
    });
}

export function post(route: string, handler: Hapi.ISessionHandler | Hapi.IRouteFailFunction) {
    server.route({
        method: 'POST',
        path: route,
        handler
    });
}

export function put(route: string, handler: Hapi.ISessionHandler | Hapi.IRouteFailFunction) {
    server.route({
        method: 'PUT',
        path: route,
        handler
    });
}

export function del(route: string, handler: Hapi.ISessionHandler | Hapi.IRouteFailFunction) {
    server.route({
        method: 'DELETE',
        path: route,
        handler
    });
}