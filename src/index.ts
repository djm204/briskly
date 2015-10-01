import routeLoader = require('./json/routes');
import * as web from './server';
import log = require('ls-logger');
export = init;

function init() {
    // Initial parsing of briskly.json
    var json = require('./json/read');
    
    // Parse briskly.json routes
    routeLoader();
    
    // Start the web server
    web.start()
        .then(() => log.info('Web server started'));
}