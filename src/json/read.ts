import Types = require('../../index.d.ts');
import fs = require('fs');
import path = require('path');
import logger = require('ls-logger');
export = brisklyJson;

var jsonPath = path.resolve(process.env.PWD, 'briskly.json');
var brisklyJson: Types.Config;

try {
    brisklyJson = JSON.parse(fs.readFileSync(jsonPath).toString());
}
catch (ex) {
    logger.error(`Failed to read brisky.json: ${ex.message}`);
}
