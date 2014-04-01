angular.module('home', ['ionic', 'hereApp.controllers'])
.controller('HomeController', function($scope, $ionicSideMenuDelegate, $http) {

    $http({method: 'GET', url: 'http://localhost/end/here/here/api/get_hots'}).
        success(function(response) {
            response.data.forEach(function(group){
                group.photos.forEach(function(photo, index){
                    group.photos[index] = 'http://localhost/end/here/here/api/img?hash=' + photo;
                });
            });

            $scope.hotgroups = response.data;
        }).error(function(data, status, headers, config) {
          
        });

    $scope.besidegroups = [{
                        photos: ['./img/1.png', './img/2.png', './img/3.png', './img/4.png'],
                        name: '南京'
                    },{
                        photos: ['./img/1.png', './img/2.png', './img/3.png', './img/4.png'],
                        name: '南京'
                    },{
                        photos: ['./img/1.png', './img/2.png', './img/3.png', './img/4.png'],
                        name: '南京'
                    },{
                        photos: ['./img/1.png', './img/2.png', './img/3.png', './img/4.png'],
                        name: '南京'
                    }];

    $scope.favoritesgroups = [{
                        photos: ['./img/1.png', './img/2.png', './img/3.png', './img/4.png'],
                        name: '上海'
                    },{
                        photos: ['./img/1.png', './img/2.png', './img/3.png', './img/4.png'],
                        name: '上海'
                    },{
                        photos: ['./img/1.png', './img/2.png', './img/3.png', './img/4.png'],
                        name: '上海'
                    },{
                        photos: ['./img/1.png', './img/2.png', './img/3.png', './img/4.png'],
                        name: '上海'
                    }];

}).controller('RecommendCollection', function($rootScope, $scope, $ionicSlideBoxDelegate, $element, $timeout, $http){
    $http({method: 'GET', url: 'http://localhost/end/here/here/api/get_recommends'}).
        success(function(response) {
            response.data.forEach(function(group){
                group.src = 'http://localhost/end/here/here/api/img?hash=' + group.hash;
            });

            $scope.recommends = response.data;
            angular.element(document.querySelector('#groupName')).html( $scope.recommends[0].name );
            $timeout(function(){
                // 强制setup
                $scope.slideBoxController.setup();
            }, 100);
        }).error(function(data, status, headers, config) {
          
        });

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
        angular.element(document.querySelector('#groupName')).html( $scope.recommends[$scope.slideBoxController.currentIndex()].name );
    }

}).controller('SliderCollection', function($rootScope, $scope, $ionicSlideBoxDelegate, $element, $ionicSideMenuDelegate){

    if($element.parent().hasClass('scroll')){
        $element.parent().css('height', '100%');
    }

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
    
})