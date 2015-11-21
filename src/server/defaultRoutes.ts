import * as path from 'path'
import * as route from '../routes/add';
import brisklyBootstrapper from '../bootstrap';
export { loadRoutes as default }

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

    brisklyBootstrapper();    
}
