import * as fs from 'fs';
import * as path from 'path';
import {server} from '../server';
import * as cfg from 'briskly-json';
import * as log from 'ls-logger';
export { bootstrapMain as default }

function wrapUserMarkup(userMarkup: string) {    
    return `
    <!DOCTYPE html>
    <html>
    ${userMarkup}
    ${getUserScript()}
    <script src="scripts/cajon.js" data-main="scripts/briskly.js"></script>
    </html>
    `
}

function getUserScript() {
    if (!cfg.json.hasOwnProperty('script')) return '';
    return `<script src="${cfg.json.script}"></script>`;
}
    

function bootstrapMain() {
    if (!cfg.json.hasOwnProperty('main')) {
        log.warn('No "main" found in briskly.json');
        return;
    }
      
	server.route({
		path: '/',
		method: 'GET',
		handler: async(req, rep) => {
			try {
				var markup = await getMainMarkup();	
				rep.html(wrapUserMarkup(markup));
			}
			catch (ex) {
				rep(ex.message, 500);
			}
		}
	});
    
    log.info('/: Route added');
}

async function getMainMarkup() {
	var main = cfg.json.main;
	var cwd = process.cwd();
	var mainPath = path.join(cwd, main);
	var mainMarkup = await getFile(mainPath);
	return mainMarkup;
}

function getFile(filepath: string): Promise<string> {
	var promise = new Promise((resolve, reject) => {
		fs.readFile(filepath, 'utf8', (error, content) => {
			if (error) return reject('Unable to retrieve file: ' + filepath);
			resolve(content);
		});
	});

	return promise;
}