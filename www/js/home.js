angular.module('home', ['ionic', 'hereApp.controllers'])
.controller('HomeController', function($scope, $ionicSideMenuDelegate) {

}).controller('RecommendCollection', function($rootScope, $scope, $ionicSlideBoxDelegate, $element){
    
    $element.bind('touchstart mousedown', function(e){
        // slidemenu打开时
        if( /275/.test(angular.element(document.querySelector('#ion-pane')).css('-webkit-transform')) ){
            $scope.slideBoxController.disable();
            $rootScope.$broadcast('closeSlideMenu');
            $rootScope.$broadcast('candrag', false);
        }
    });

    $element.bind('touchend mouseup', function(e){
        $rootScope.$broadcast('candrag', true);
    });

}).controller('SliderCollection', function($rootScope, $scope, $ionicSlideBoxDelegate, $element, $ionicSideMenuDelegate){

    $element.bind('touchstart mousedown', function(e){
        // slidemenu打开时
        if( /275/.test(angular.element(document.querySelector('#ion-pane')).css('-webkit-transform')) ){
            $scope.slideBoxController.disable();
            $rootScope.$broadcast('closeSlideMenu');
            $rootScope.$broadcast('candrag', false);
        }
    });

    $element.bind('touchend mouseup', function(e){
        $rootScope.$broadcast('candrag', true);
    });

    $scope.slide = function(){
        if($scope.slideBoxController.currentIndex() == 0){
            $rootScope.$broadcast('candrag', true);
        }else{
            $rootScope.$broadcast('candrag', false);
        }

        $rootScope.$broadcast('homeSlide', $scope.slideBoxController.currentIndex());
    }
}).controller('HomeTabController', function($rootScope, $scope){
    $scope.$on('homeSlide', function(e, index){
        var tabs = angular.element(document.querySelector('#homeTabs')).children();
        var currentTab = tabs[index];
        angular.element(tabs).removeClass('active');
        angular.element(currentTab).addClass('active');
    });
})