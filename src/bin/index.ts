#!/usr/bin/env node

import start from './start';
import init from './init';
import * as minimist from 'minimist';

var args = minimist(process.argv.slice(2));

if (args['start']) {
	start();
}

if (args['run']) {
	start();
}

if (args['init']) {
	init();
}