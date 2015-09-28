var fs = require('fs');
var path = require('path');
var logger = require('ls-logger');
var jsonPath = path.resolve(process.env.PWD, 'briskly.json');
var brisklyJson;
try {
    brisklyJson = JSON.parse(fs.readFileSync(jsonPath).toString());
}
catch (ex) {
    logger.error("Failed to read brisky.json: " + ex.message);
}
module.exports = brisklyJson;
//# sourceMappingURL=read.js.map