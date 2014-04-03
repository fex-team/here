angular.module('hereApp', ['ionic', 'hereApp.services', 'hereApp.controllers', 'home','capture','settings','detail','register','login','map'])

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
      url: "/detail?groupId",
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
      url: "/login",
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
      url: "/map",
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
      
    });
  
	$urlRouterProvider.otherwise("/sidemenu/home");
	
});
