(function () {
    'use strict';

    var params = {
        scriptToLoad: './SkypeBootstrap.js',
        id: 'skype_bootstrap',
        callback: function callback() {
            window.Skype.initialize({ apiKey: 'shareButton' }, function () {}, function () {});
        }
    };

    loadSkypeWebSdkAsync(params);
})();