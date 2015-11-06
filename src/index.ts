import routeLoader from './json/routes';
import * as web from './server';
import * as log from 'ls-logger';
require('babel-polyfill');

export async function init() {
    // Initial parsing of briskly.json
    var json = require('./json/read');
    
    // Parse briskly.json routes
    routeLoader();
          
    // Start the web server
    var webStart = web.start();
    var result = await webStart;
    log.info('Web server started');
       
    return webStart;    
}