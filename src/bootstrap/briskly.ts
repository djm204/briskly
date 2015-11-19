
(<any>require).config({
	baseUrl: '/scripts',
	shim: {
		'jquery': {
			exports: 'jQuery'
		}
	}	
});

(<any>require)([/* what file here? */]);