var routeLoader = require('./json/routes');
var web = require('./server');
var log = require('ls-logger');
function init() {
    // Initial parsing of briskly.json
    var json = require('./json/read');
    // Parse briskly.json routes
    routeLoader();
    // Start the web server
    web.start()
        .then(function () { return log.info('Web server started'); });
}
module.exports = init;
//# sourceMappingURL=index.js.map