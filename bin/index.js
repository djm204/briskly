#!/usr/bin/env node

var start = require('./start');
var init = require('./init');
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));
if (args['start']) {
    start.default();
}
if (args['run']) {
    start.default();
}
if (args['init']) {
    init.default();
}
//# sourceMappingURL=index.js.map