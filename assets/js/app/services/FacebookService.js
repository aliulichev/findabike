angular.module('app').factory('FacebookService', ['$window', function ($window) {

    var user = null,
        FacebookService = {

            login: function () {

                var self = this;

                FB.login(function (response) {

                    if (response.authResponse) {
                        self.getUser();
                    } else {
                    }
                }, {scope: 'email'});
            },

            getUser: function () {

                FB.api('/me', function (response) {
                    console.log(response);
                });

            }
        };

    $window.fbAsyncInit = function () {

        FB.init({
            appId: '1628854540733007',
            xfbml: true,
            version: 'v2.4'
        });

        FB.getLoginStatus(function (response) {

            if (response.status === 'connected') {
                FacebookService.getUser();
            } else if (response.status === 'not_authorized') {
                FacebookService.login()
            } else {
                FacebookService.login()
            }
        });
    };

    return FacebookService;

}]);