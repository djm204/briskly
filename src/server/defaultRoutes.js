var path = require('path');
var route = require('../routes/add');
var root = path.resolve(__dirname, '../../node_modules');
var bootstrapJs = path.resolve(root, 'boostrap/dist/js/bootstrap.min.js');
var bootstrapCss = path.resolve(root, 'boostrap/dist/css/bootstrap.min.css');
var knockout = path.resolve(root, 'knockout/build/output/knockout-latest.js');
var cajon = path.resolve(root, 'cajon/cajon.js');
route.get('/scripts/bootstrap.js', function (request, reply) { return reply.file(bootstrapJs); });
route.get('/styles/bootstrap.js', function (request, reply) { return reply.file(bootstrapCss); });
route.get('/scripts/knockout.js', function (request, reply) { return reply.file(knockout); });
route.get('/scripts/cajon.js', function (request, reply) { return reply.file(cajon); });
//# sourceMappingURL=defaultRoutes.js.map