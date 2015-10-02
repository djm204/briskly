var fs = require('fs');
var path = require('path');
var logger = require('ls-logger');
var workingDirectory = process.env.PWD;
var jsonPath = path.resolve(process.env.PWD, 'briskly.json');
var brisklyJson;
try {
    brisklyJson = JSON.parse(fs.readFileSync(jsonPath).toString());
    shimIncludes();
}
catch (ex) {
    logger.error("Failed to read brisky.json: " + ex.message);
}
function shimIncludes() {
    if (!brisklyJson.routes && brisklyJson.routes['include'])
        return;
    var include = brisklyJson.routes['include'];
    if (!include['files'])
        return;
    var files = include['files'];
    if (!Array.isArray(files))
        return;
    var includePath = include['root'] || '/';
    var basePath = path.resolve(path.join(workingDirectory, includePath));
    var addRoute = function (routePath, route) {
        if (brisklyJson.routes[route.path]) {
            logger.warn(routePath + ": Duplicate route. Route ignored.");
            return;
        }
        route.path = routePath;
        brisklyJson.routes[routePath] = route;
    };
    files.forEach(function (file) {
        var filePath = path.resolve(path.join(basePath, file));
        try {
            var includeBody = fs.readFileSync(filePath).toString();
            var json = JSON.parse(includeBody);
            Object.keys(json)
                .forEach(function (key) { return addRoute(key, json[key]); });
        }
        catch (ex) {
            logger.error(file + ": Unable to parse include: " + ex.message);
        }
    });
}
module.exports = brisklyJson;
//# sourceMappingURL=read.js.map