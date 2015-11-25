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
		getConfig: (name: string, callback: (component: { viewModel: any, template: any }) => void) => {
			// Get the template markup
		 	var template = $.get(`/components/${name}.html`);
			 
			// Get the viewModel constructor
			var viewModel = (<any>require)(`../components/${name}`);
			
			
			callback({ viewModel: null, template: null });
		}
	};

	ko.components.loaders.unshift(customerLoader);

});
