angular.module('home', ['ionic', 'hereApp.controllers'])
.controller('HomeController', function($scope, $ionicSideMenuDelegate) {

}).controller('RecommendCollection', function($rootScope, $scope, $ionicSlideBoxDelegate, $element){
    
    $element.bind('touchstart mousedown', function(e){
        // slidemenu打开时
        if( /275/.test(angular.element(document.querySelector('#ion-pane')).css('-webkit-transform')) ){
            $scope.slideBoxController.disable();
            $rootScope.$broadcast('closeSlideMenu');
            // setTimeout(function(){
            //     $scope.slideBoxController.enable();
            // }, 400);
        }
        // $scope.slideBoxController.stopPropagation(true);
    });

    $scope.slide = function(){
        // $scope.slideBoxController.stopPropagation(true);
    }
}).controller('SliderCollection', function($rootScope, $scope, $ionicSlideBoxDelegate, $element, $ionicSideMenuDelegate){
    // console.log($element);
    $element.bind('touchstart mousedown', function(e){
        // slidemenu打开时
        if( /275/.test(angular.element(document.querySelector('#ion-pane')).css('-webkit-transform')) ){
            $scope.slideBoxController.disable();
            $rootScope.$broadcast('closeSlideMenu');
        }
        // $scope.slideBoxController.stopPropagation(true);
    });

    $scope.slide = function(){
        if($scope.slideBoxController.currentIndex() == 0){
            $rootScope.$broadcast('candrag', true);
            // $scope.slideBoxController.stopPropagation(false);
        }else{
            $rootScope.$broadcast('candrag', false);
            // $scope.slideBoxController.stopPropagation(true);
        }
    }
});