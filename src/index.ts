import "babel-polyfill";
import routeLoader from './json/routes';
import * as web from './server';
import * as log from 'ls-logger';
import * as json from 'briskly-json';
import loadDefaultRoutes from './server/defaultRoutes';

export async function init() {
    // Initial parsing of briskly.json
    var json = require('./json/read');
    
    // Parse briskly.json routes
    routeLoader();
    
    // Load briskly default routes
    loadDefaultRoutes();
          
    // Start the web server
    var started = await web.start();
    
    log.info(`Web server started on port ${web.server.port}`);
       
    return started;    
}