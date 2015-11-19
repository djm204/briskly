#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var start_1 = require('./start');
var init_1 = require('./init');
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));
if (args['start']) {
    start_1.default();
}
if (args['run']) {
    start_1.default();
}
if (args['init']) {
    init_1.default();
}
//# sourceMappingURL=index.js.map