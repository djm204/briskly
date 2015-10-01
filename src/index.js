var routeLoader = require('./json/routes');
var web = require('./server');
var log = require('ls-logger');
function init() {
    // Initial parsing of briskly.json
    var json = require('./json/read');
    // Parse briskly.json routes
    routeLoader();
    // Start the web server
    var webStart = web.start();
    webStart.then(function () { return log.info('Web server started'); });
    return webStart;
}
exports.init = init;
//# sourceMappingURL=index.js.map