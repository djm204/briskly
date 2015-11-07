import * as path from 'path'
import route = require('../routes/add');
var root = path.resolve(__dirname, '../../node_modules');

var bootstrapJs = path.resolve(root, 'boostrap/dist/js/bootstrap.min.js');
var bootstrapCss = path.resolve(root, 'boostrap/dist/css/bootstrap.min.css');
var knockout = path.resolve(root, 'knockout/build/output/knockout-latest.js');
var cajon = path.resolve(root, 'cajon/cajon.js');

route.get('/scripts/bootstrap.js', (request, reply) => reply.file(bootstrapJs));
route.get('/styles/bootstrap.css', (request, reply) => reply.file(bootstrapCss));
route.get('/scripts/knockout.js', (request, reply) => reply.file(knockout));
route.get('/scripts/cajon.js', (request, reply) => reply.file(cajon));

