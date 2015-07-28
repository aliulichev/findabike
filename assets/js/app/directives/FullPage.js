angular.module('app').directive('fullPage', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/FullPage.html',
        controller: function ($scope, $element, $attrs) {

            $(document).ready(function () {
                $('#fullpage').fullpage();
                $.fn.fullpage.setAllowScrolling(false);
                $.fn.fullpage.setMouseWheelScrolling(false);
                $.fn.fullpage.setKeyboardScrolling(false);
            });
        }
    }
});
