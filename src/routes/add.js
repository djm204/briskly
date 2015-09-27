var server_1 = require('../server');
function get(route, handler) {
    server_1.server.route({
        method: 'GET',
        path: route,
        handler: handler
    });
}
exports.get = get;
function post(route, handler) {
    server_1.server.route({
        method: 'POST',
        path: route,
        handler: handler
    });
}
exports.post = post;
function put(route, handler) {
    server_1.server.route({
        method: 'PUT',
        path: route,
        handler: handler
    });
}
exports.put = put;
function del(route, handler) {
    server_1.server.route({
        method: 'DELETE',
        path: route,
        handler: handler
    });
}
exports.del = del;
//# sourceMappingURL=add.js.map