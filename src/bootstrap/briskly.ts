(<any>require).config({
	baseUrl: '/scripts',
	shim: {
		'jquery': {
			exports: 'jQuery'
		}
	}
});

(<any>require)(['knockout', 'jquery'], (ko: KnockoutStatic, $: JQueryStatic) => {
	var customerLoader = {
		loadTemplate: (name: string, config: any, callback: any) => {
			
		}
	};

	ko.components.loaders.unshift(customerLoader);

});
