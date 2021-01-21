#!/usr/bin/env node
var log = require('ls-logger');
var start = require('./start');
var init = require('./init');
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

var command = args._[0].toLowerCase();
run();

function run() {
    switch (command) {
        case 'start':
            return start.default();
        case 'run':
            return start.default();
        case 'init':
            return init.default();
    }
    log.error('Command not found: ' + command);
}
