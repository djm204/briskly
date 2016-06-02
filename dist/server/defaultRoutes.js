"use strict";

var path = require('path');
var route = require('../routes/add');
var bootstrap_1 = require('../bootstrap');
var root = path.resolve(__dirname, '../../node_modules');
var brisklyRoot = path.resolve(__dirname, '../../');
var bootstrapJs = path.resolve(root, 'boostrap/dist/js/bootstrap.min.js');
var bootstrapCss = path.resolve(root, 'boostrap/dist/css/bootstrap.min.css');
var knockout = path.resolve(root, 'knockout/build/output/knockout-latest.js');
var cajon = path.resolve(root, 'cajon/cajon.js');
var jquery = path.resolve(root, 'jquery/dist/jquery.min.js');
var briskly = path.resolve(brisklyRoot, 'src/bootstrap/briskly.js');
function loadRoutes() {
    route.get('/scripts/bootstrap.js', function (request, reply) {
        return reply.file(bootstrapJs);
    });
    route.get('/styles/bootstrap.css', function (request, reply) {
        return reply.file(bootstrapCss);
    });
    route.get('/scripts/knockout.js', function (request, reply) {
        return reply.file(knockout);
    });
    route.get('/scripts/cajon.js', function (request, reply) {
        return reply.file(cajon);
    });
    route.get('/scripts/briskly.js', function (request, reply) {
        return reply.file(briskly);
    });
    route.get('/scripts/jquery.js', function (request, reply) {
        return reply.file(jquery);
    });
    bootstrap_1.default();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadRoutes;
//# sourceMappingURL=defaultRoutes.js.map