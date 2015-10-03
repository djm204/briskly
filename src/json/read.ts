import Types = require('../../index.d.ts');
import fs = require('fs');
import path = require('path');
import logger = require('ls-logger');
export = brisklyJson;

var workingDirectory = process.env.PWD;
var jsonPath = path.resolve(process.env.PWD, 'briskly.json');
var brisklyJson: Types.Config;

try {
    brisklyJson = JSON.parse(fs.readFileSync(jsonPath).toString());
    shimIncludes();
}
catch (ex) {
    logger.error(`Failed to read brisky.json: ${ex.message}`);
}

function shimIncludes() {

    if (!brisklyJson.routes && brisklyJson.routes['include'])
        return;

    var include = brisklyJson.routes['include'];

    if (!include['files']) return;

    var files: string[] = include['files'];
    if (!Array.isArray(files)) return;


    var addRoute = (routePath: string, route: Types.Route) => {
        if (brisklyJson.routes[route.path]) {
            logger.warn(`${routePath}: Duplicate route. Route ignored.`);
            return;
        }

        route.path = routePath;
        // We do not need to do validation here because it'll be done in the route loader
        brisklyJson.routes[routePath] = route;
    }

    files.forEach(file => {
        var filePath = getIncludePath(file, <any>include);
        
        try {
            var includeBody = fs.readFileSync(filePath).toString();
            var json = JSON.parse(includeBody);
            Object.keys(json)
                .forEach(key => addRoute(key, json[key]))
        }
        catch (ex) {
            logger.error(`${file}: Unable to parse include: ${ex.message}`);
        }
    })
}

function getIncludePath(file: string, include: Types.Include) {
    var includePath = include['root'] || '/';
    var basePath = path.resolve(path.join(workingDirectory, includePath));
    
    if (path.extname(file) === '') file += '.json';
    return path.resolve(path.join(basePath, file));
}