(<any>require).config({
	baseUrl: '/scripts',
	shim: {
		'jquery': {
			exports: 'jQuery'
		}
	}	
});

var customerLoader = {
	loadTemplate: (name: string, config: any, callback: any) => {
		
	}
};

(<any>require)(['knockout'], (ko: KnockoutStatic) => {
	ko.components.loaders.unshift(customerLoader);
});
