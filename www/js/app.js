
angular.module('hereApp', ['ionic', 'hereApp.services', 'hereApp.controllers','nativeDirective', 'home','gallery','capture','settings','detail','register','login','map','person_detail','zone','person_edit','syncModule','syncConfirmModule','component.shareDialog','mobiscroll','comment','page','starList'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('sidemenu', {
      url: "/sidemenu",
      abstract: true,
      views:{
      	'pager':{
      		templateUrl: "templates/side_menu.html"
      	}
      }
      
    }).state('sidemenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    }).state('sidemenu.setting', {
      url: "/setting",
      views: {
        'menuContent' :{
          templateUrl: "templates/setting.html"
        }
      }
    }).state('sidemenu.zone', {
      url: "/zone",
      views: {
        'menuContent' :{
          templateUrl: "templates/zone.html"
        }
      }
    }).state('detail', {
      url: "/detail?groupId&native",
      views:{
      	'pager':{
      		templateUrl: "templates/detail.html"
      	}
      }
      
    }).state('capture_confirm', {
      url: "/capture_confirm?data",
      views:{
      	'pager':{
      		templateUrl: "templates/capture_confirm.html"
      	}
      }
      
    }).state('login', {
      url: "/login?referer",
      views:{
      	'pager':{
      		templateUrl: "templates/login.html"
      	}
      }
      
    }).state('register', {
      url: "/register",
      views:{
      	'pager':{
      		templateUrl: "templates/register.html"
      	}
      }
      
    }).state('about_us', {
      url: "/about_us",
      views:{
      	'pager':{
      		templateUrl: "templates/about_us.html"
      	}
      }
      
    }).state('guide', {
      url: "/guide",
      views:{
      	'pager':{
      		templateUrl: "templates/guide.html"
      	}
      }
      
    }).state('map', {
      url: "/map?position",
      views:{
      	'pager':{
      		templateUrl: "templates/map.html"
      	}
      }
      
    }).state('upload', {
      url: "/upload",
      views:{
        'pager':{
          templateUrl: "templates/upload.html"
        }
      }
      
    }).state('person_detail', {
      url: "/person_detail",
      views:{
        'pager':{
          templateUrl: "templates/person_detail.html"
        }
      }
      
    }).state('person_edit', {
      url: "/person_edit",
      views:{
        'pager':{
          templateUrl: "templates/person_edit.html"
        }
      }
      
    }).state('gallery', {
      url: "/gallery",
      abstract: true,
      views:{
        'pager':{
          templateUrl: "templates/gallery.html"
        }
      }
      
    }).state('gallery.local', {
      url: "/local",
      views: {
        'gallery-local-tab': {
          templateUrl: "templates/local.html"
        }
      }
    }).state('gallery.network', {
      url: "/network",
      views: {
        'gallery-network-tab': {
          templateUrl: "templates/network.html"
        }
      }
    }).state('my_groups', {
      url: "/my_groups",
      views: {
        'pager': {
          templateUrl: "templates/my_groups.html"
        }
      }
    }).state('sync', {
      url: "/sync?groupId",
      views:{
        'pager':{
          templateUrl: "templates/sync.html"
        }
      }
      
    }).state('sync_confirm', {
      url: "/sync_confirm?groupId",
      views:{
        'pager':{
          templateUrl: "templates/sync_confirm.html"
        }
      }
      
    }).state('my_received_comments', {
      url: "/my_received_comments",
      views:{
        'pager':{
          templateUrl: "templates/my_received_comments.html"
        }
      }
      
    }).state('my_comments', {
      url: "/my_comments",
      views:{
        'pager':{
          templateUrl: "templates/my_comments.html"
        }
      }
      
    }).state('page', {
      url: "/page",
      views:{
        'pager':{
          templateUrl: "templates/page.html"
        }
      }
      
    }).state('star_list', {
      url: "/star_list",
      views:{
        'pager':{
          templateUrl: "templates/star_list.html"
        }
      }
      
    });
  
	$urlRouterProvider.otherwise("/sidemenu/home");

  Here.isLogin = false;
  cookie.defaults.path = '/';
      
      if(cookie.get('username')){
        Here.userInfo = {
          'username': cookie.get('username'),
                    'nickname': cookie.get('nickname'),
                    'appKey': cookie.get('appKey')
        }

        Here.isLogin = true;
        
      }
}).directive('loading', function() {
    return {
        restrict: 'E',
        template: '<div class="position-loading">'+
                        '<div class="windows9">'+
                            '<div class="wBall" id="wBall_1">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                            '<div class="wBall" id="wBall_2">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                            '<div class="wBall" id="wBall_3">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                            '<div class="wBall" id="wBall_4">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                            '<div class="wBall" id="wBall_5">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
    };
})
