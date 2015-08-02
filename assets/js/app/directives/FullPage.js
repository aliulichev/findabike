angular.module('app').directive('fullPage', ['$http', function ($http) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/FullPage.html',
        controller: function ($scope, $element, $attrs) {

            $scope.form = {
                id: null,
                email: null,
                price: 50,
                keywords: []
            };

            $scope.hide_form = false;

            $scope.submitForm = function () {

                $http.post('/subscribe', {
                    id: $scope.form.id,
                    email: $scope.form.email,
                    price: $scope.form.price,
                    keywords: $scope.form.keywords.map(function (item) {
                        return item.text;
                    })
                }).
                    then(function(res) {
                        $scope.hide_form = true;
                    }, function(response) {
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
