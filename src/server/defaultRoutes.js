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
var root = path.resolve(__dirname, '../../node_modules');
var bootstrapJs = path.resolve(root, 'boostrap/dist/js/bootstrap.min.js');
var bootstrapCss = path.resolve(root, 'boostrap/dist/css/bootstrap.min.css');
var knockout = path.resolve(root, 'knockout/build/output/knockout-latest.js');
var cajon = path.resolve(root, 'cajon/cajon.js');
route.get('/scripts/bootstrap.js', (request, reply) => reply.file(bootstrapJs));
route.get('/styles/bootstrap.js', (request, reply) => reply.file(bootstrapCss));
route.get('/scripts/knockout.js', (request, reply) => reply.file(knockout));
route.get('/scripts/cajon.js', (request, reply) => reply.file(cajon));
//# sourceMappingURL=defaultRoutes.js.map