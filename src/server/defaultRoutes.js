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
var path = require('path');
var route = require('../routes/add');
var bootstrap_1 = require('../bootstrap');
var root = path.resolve(__dirname, '../../node_modules');
var brisklyRoot = path.resolve(__dirname, '../../');
var bootstrapJs = path.resolve(root, 'boostrap/dist/js/bootstrap.min.js');
var bootstrapCss = path.resolve(root, 'boostrap/dist/css/bootstrap.min.css');
var knockout = path.resolve(root, 'knockout/build/output/knockout-latest.js');
var cajon = path.resolve(root, 'cajon/cajon.js');
var briskly = path.resolve(brisklyRoot, 'src/bootstrap/briskly.js');
function loadRoutes() {
    route.get('/scripts/bootstrap.js', (request, reply) => reply.file(bootstrapJs));
    route.get('/styles/bootstrap.css', (request, reply) => reply.file(bootstrapCss));
    route.get('/scripts/knockout.js', (request, reply) => reply.file(knockout));
    route.get('/scripts/cajon.js', (request, reply) => reply.file(cajon));
    route.get('/scripts/briskly.js', (request, reply) => reply.file(briskly));
    bootstrap_1.default();
}
exports.default = loadRoutes;
//# sourceMappingURL=defaultRoutes.js.map