import routeLoader = require('./json/routes');
import * as web from './server';
import log = require('ls-logger');

export function init() {
    // Initial parsing of briskly.json
    var json = require('./json/read');
    
    // Parse briskly.json routes
    routeLoader();
    
    // Start the web server
    var webStart = web.start();
    webStart.then(() => log.info('Web server started'));
    
    return webStart;    
}