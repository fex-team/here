angular.module('home', ['ionic', 'hereApp.controllers'])
.controller('HomeController', function($rootScope, $scope, $ionicSideMenuDelegate, $element, $ionicScrollDelegate) {
    $scope.element = $element;
    $rootScope.$on('homeSlide', function(e, index){
        $ionicScrollDelegate.scrollTop();

        if( index === 1 && !$scope.besidegroups ){

            navigator.geolocation.getCurrentPosition(function(position){
                console.log(position);
                Here.api.get('/api/get_besides', {
                        position: position.coords.longitude + ',' + position.coords.latitude
                    }, {
                        success: function(data){
                            angular.element(document.getElementById('positionLoading')).remove()
                            data.forEach(function(group){
                                group.photos.forEach(function(photo, index){
                                    group.photos[index] = Here.serverAddress + '&c=api&a=img&hash=' + photo;
                                });
                            });

                            $scope.besidegroups = data;
                            $scope.$apply();

                        },
                        error: function(data){
                            angular.element(document.getElementById('positionLoading')).remove()
                            $scope.besidegroups = [];
                            $scope.getCurrentPositionFailure = true;
                            $scope.$apply();
                        }
                    });
            }, function(){
                $scope.element.find('loading').remove();
                $scope.besidegroups = [];
                $scope.getCurrentPositionFailure = true;
                $scope.$apply();
            }, {
                timeout: 3000
            });
        }

        if( index === 2 && !$scope.collectgroups ){
            $scope.collectgroups = [];
             Here.api.get('/api/get_collectGroup', {}, {
                        success: function(data){
                            angular.element(document.getElementById('collectGroupsLoading')).remove()
                            data.forEach(function(group){
                                group.cover = Here.serverAddress + '&c=api&a=img&hash=' + group.hash;
                            });

                            $scope.collectgroups = data;
                            $scope.$apply();
                        },
                        error: function(data){
                            angular.element(document.getElementById('collectGroupsLoading')).remove()
                            $scope.collectgroups = [];
                            $scope.getCollectGroupsFailure = true;
                            $scope.$apply();    
                        }
                    });
        }
    });

    setTimeout(function(){
        Here.api.get('/api/get_hots', {}, {
                        success: function(data){
                            data.forEach(function(group){
                                group.photos.forEach(function(photo, index){
                                    group.photos[index] = Here.serverAddress + '&c=api&a=img&hash=' + photo;
                                });
                            });

                            $scope.hotgroups = data;
                            $scope.$apply();

                        },
                        error: function(data){
                            console.log(data);
                        }
                    });
    }, 100);

    

}).controller('RecommendCollection', function($rootScope, $scope, $ionicSlideBoxDelegate, $element, $timeout){
var ratio = window.devicePixelRatio || 1;
    Here.api.get('/api/get_recommends', {}, {
                    success: function(data){
                        data.forEach(function(group){
                            group.src = Here.serverAddress + '&c=api&a=img&hash=' + group.hash + '&maxWidth=' + window.innerWidth*ratio;
                        });

                        $scope.recommends = data;
                        $scope.currentGroup = $scope.recommends[0].name;
                        $timeout(function(){
                            // 强制setup
                            $scope.slideBoxController.setup();
                        }, 100);
                        $scope.$apply();
                    },
                    error: function(data){
                        console.log(data);
                    }
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
        $scope.currentGroup = $scope.recommends[$scope.slideBoxController.currentIndex()].name;
    }

}).controller('SliderCollection', function($rootScope, $scope, $ionicSlideBoxDelegate, $element, $ionicSideMenuDelegate){

    if($element.parent().hasClass('scroll')){
        $element.parent().css('min-height', '100%');
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

    $rootScope.slideTo = function(index){
        $scope.slideBoxController.slide(index);
    }
}).controller('HomeTabController', function($rootScope, $scope, $ionicSlideBoxDelegate){
    $scope.$on('homeSlide', function(e, index){
        var tabs = angular.element(document.querySelector('#homeTabs')).children();
        var currentTab = tabs[index];
        angular.element(tabs).removeClass('active');
        angular.element(currentTab).addClass('active');
    });


}).controller('HotGroup', function($scope){
    
})