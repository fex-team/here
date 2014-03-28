angular.module('home', ['ionic', 'hereApp.controllers'])
.controller('HomeController', function($scope, $ionicSideMenuDelegate) {

}).controller('RecommendCollection', function($rootScope, $scope, $ionicSlideBoxDelegate, $element, $timeout){
    $scope.recommends = [{
                            src: 'http://localhost/end/here/here/api/img?hash=/jianling/71ac93f55524725308d293d37925069d.jpg',
                            position: '百度大厦'
                        },{
                            src: 'http://localhost/end/here/here/api/img?hash=/jianling/71ac93f55524725308d293d37925069d.jpg',
                            position: '奎科大厦'
                        },{
                            src: 'http://localhost/end/here/here/api/img?hash=/jianling/71ac93f55524725308d293d37925069d.jpg',
                            position: '文思海辉'
                        }];
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

    angular.element(document.querySelector('#recommendPosition')).html( $scope.recommends[0].position );

    $scope.slide = function(){
        angular.element(document.querySelector('#recommendPosition')).html( $scope.recommends[$scope.slideBoxController.currentIndex()].position );
    }

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
}).controller('HotGroup', function($scope){
    $scope.groups = [{
                        photos: ['./img/1.png', './img/2.png', './img/3.png', './img/4.png'],
                        position: '北京'
                    },{
                        photos: ['./img/1.png', './img/2.png', './img/3.png', './img/4.png'],
                        position: '北京'
                    },{
                        photos: ['./img/1.png', './img/2.png', './img/3.png', './img/4.png'],
                        position: '北京'
                    },{
                        photos: ['./img/1.png', './img/2.png', './img/3.png', './img/4.png'],
                        position: '北京'
                    }];
})