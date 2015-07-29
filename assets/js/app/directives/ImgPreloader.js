angular.module('app').directive('imgPreloader', function () {
    return {
        restrict: 'E',
        replace: true,
        //templateUrl: '/templates/ImgPreloader.html',
        template: '',
        controller: function ($scope, $element, $attrs) {

            var imgs = [], i;

            for (i = 2; i < 5; i++) {
                imgs[i] = new Image();
                imgs[i].src = '/images/' + i + '.jpg';
            }
        }
    }
});