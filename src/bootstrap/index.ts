import * as fs from 'fs';
import * as path from 'path';
import {server} from '../server';
import * as cfg from 'briskly-json';

var bootstrapMarkup = '';

function bootstrapMain() {
	server.route({
		path: '/',
		method: 'GET',
		handler: async(req, rep) => {
			try {
				var markup = await getMainMarkup();
				var bootstrappedMarkup = markup + '\n' + bootstrapMarkup;
				// TODO: Implement reply.view(...) in briskly-router
				rep(bootstrappedMarkup);
			}
			catch (ex) {
				rep(ex.message, 500);
			}
		}
	})
}

async function getMainMarkup() {
	var main = cfg.json.main;
	var cwd = process.cwd();
	var mainPath = path.join(cwd, main);
	var mainMarkup = await getFile(mainPath);
	return mainMarkup;
}

/**
 * Pre-optimization...
 * Cache the bootstrappd briskly markup 
 */
async function getMarkup() {
	var markupPath = path.join(__dirname, 'index.html');
	var markup = await getFile(markupPath);

	return bootstrapMarkup = markup;
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