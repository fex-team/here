angular.module('hereApp', ['ionic', 'hereApp.services', 'hereApp.controllers', 'home','capture'])

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
      url: "/detail",
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
      
    }).state('capture', {
      url: "/capture?group_id",
      views:{
      	'pager':{
      		templateUrl: "templates/capture.html"
      	}
      }
      
    });
  
	$urlRouterProvider.otherwise("/sidemenu/home");
	
});

