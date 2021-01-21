import { server } from '../server';
import * as BR from 'briskly-router';

export function get(route: string, handler: BR.RouteHandler) {
    server.route({
        method: 'GET',
        path: route,
        handler
    });
}

export function post(route: string, handler: BR.RouteHandler) {
    server.route({
        method: 'POST',
        path: route,
        handler
    });
}

export function put(route: string, handler: BR.RouteHandler) {
    server.route({
        method: 'PUT',
        path: route,
        handler
    });
}

export function del(route: string, handler: BR.RouteHandler) {
    server.route({
        method: 'DELETE',
        path: route,
        handler
    });
}