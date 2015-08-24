angular.module('app', ['ngTagsInput']);
angular.module('app').controller('PageCtrl', ['$scope', '$http', function ($scope, $http) {

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
            then(function () {
                $scope.hide_form = true;
                ga('send', 'event', 'subscribe');
            }, function () {
            });
    };
}]);
