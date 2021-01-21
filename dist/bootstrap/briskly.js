'use strict';

require.config({
    baseUrl: '/scripts',
    shim: {
        'jquery': {
            exports: 'jQuery'
        }
    }
});
require(['knockout', 'jquery'], function (ko, $) {
    var customerLoader = {
        getConfig: function getConfig(name, callback) {
            // Retrieve the template markup and viewModel constructor asynchronously
            var templateRequest = $.get('/components/' + name + '.html');
            require('../components/' + name, function (viewModel) {
                templateRequest.then(function (template) {
                    return callback({ viewModel: viewModel, template: template });
                });
            });
        }
    };
    ko.components.loaders.unshift(customerLoader);
});
//# sourceMappingURL=briskly.js.map