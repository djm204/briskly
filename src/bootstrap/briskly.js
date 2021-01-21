require.config({
    baseUrl: '/scripts',
    shim: {
        'jquery': {
            exports: 'jQuery'
        }
    }
});
require(['knockout', 'jquery'], (ko, $) => {
    var customerLoader = {
        getConfig: (name, callback) => {
            // Retrieve the template markup and viewModel constructor asynchronously 
            var templateRequest = $.get(`/components/${name}.html`);
            require(`../components/${name}`, viewModel => {
                templateRequest.then(template => callback({ viewModel: viewModel, template: template }));
            });
        }
    };
    ko.components.loaders.unshift(customerLoader);
});
//# sourceMappingURL=briskly.js.map