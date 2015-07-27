angular.module('app').directive('auth', ['FacebookService', function (FacebookService) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/Auth.html',
        controller: function ($scope, $element, $attrs) {

            $scope.login = function () {
                FacebookService.login();
            };
        }
    }
}]);