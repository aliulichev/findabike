angular.module('app').directive('fullPage', ['$http', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/FullPage.html',
        controller: function ($scope, $element, $attrs) {

            $scope.form = {
                id: null,
                email: null,
                range: 50,
                keywords: []
            };

            $scope.submitForm = function () {
                console.log($scope.form);

                $http.post('/someUrl', $scope.form).
                    then(function(res) {

                        console.log('suc');
                        console.log(res);

                    }, function(response) {
                        console.log('err');
                    });

            };
        },
        link: function () {
            $(document).ready(function () {
                $('#fullpage').fullpage();
                $.fn.fullpage.setAllowScrolling(false);
                $.fn.fullpage.setMouseWheelScrolling(false);
                $.fn.fullpage.setKeyboardScrolling(false);
            });
        }
    }
}]);
