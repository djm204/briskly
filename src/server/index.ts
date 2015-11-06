import * as log from 'ls-logger';
import config from '../json/read';
import * as BR from 'briskly-router';

var port = config.port || 1337;

export var server = new BR.Router({ port });

export async function start(port?: number) {
    try {
        await server.start();
        return true;
    }
    catch (ex) {
        return false;
    }
}

export async function stop(timeout?: number) {
    try {
        await server.stop();
        return true;
    }
    catch (ex) {
        return false;
    }
}
