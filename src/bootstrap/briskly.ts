var require: any;

require.config({
	baseUrl: '/scripts',
	shim: {
		'jquery': {
			exports: 'jQuery'
		}
	}	
});

require([/* what file here? */]);