"use strict";
const Cfg = require('briskly-json');
const fs = require('fs');
const path = require('path');
const logger = require('ls-logger');
var brisklyJson = Cfg.json;
exports.default = brisklyJson;
shimIncludes();
function shimIncludes() {
    if (!brisklyJson.routes && brisklyJson.routes['include'])
        return;
    var include = brisklyJson.routes['include'];
    if (!include['files'])
        return;
    var files = include['files'];
    if (!Array.isArray(files))
        return;
    var addRoute = (routePath, route) => {
        if (brisklyJson.routes[route.path]) {
            logger.warn(`${routePath}: Duplicate route. Route ignored.`);
            return;
        }
        route.path = routePath;
        // We do not need to do validation here because it'll be done in the route loader
        brisklyJson.routes[routePath] = route;
    };
    files.forEach(file => {
        var filePath = getIncludePath(file, include);
        try {
            var includeBody = fs.readFileSync(filePath).toString();
            var json = JSON.parse(includeBody);
            Object.keys(json)
                .forEach(key => addRoute(key, json[key]));
        }
        catch (ex) {
            logger.error(`${file}: Unable to parse include: ${ex.message}`);
        }
    });
}
function getIncludePath(file, include) {
    var includePath = include['root'] || '/';
    var basePath = path.join(process.cwd(), includePath);
    if (path.extname(file) === '')
        file += '.json';
    return path.resolve(path.join(basePath, file));
}
//# sourceMappingURL=read.js.map