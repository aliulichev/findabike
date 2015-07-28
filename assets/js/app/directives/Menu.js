angular.module('app').directive('menu', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/Menu.html',
        controller: function ($scope, $element, $attrs) {

            $scope.slideTo = function (n) {
                $.fn.fullpage.moveTo(n);
            };
        }
    }
});