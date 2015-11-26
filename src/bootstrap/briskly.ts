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
			// Retrieve the template markup and viewModel constructor asynchronously 
		 	var templateRequest = $.get(`/components/${name}.html`);
			 
			(<any>require)(`../components/${name}`, viewModel => {
				templateRequest.then(template => callback({ viewModel, template }));
			});
			
		}
	};

	ko.components.loaders.unshift(customerLoader);

});
