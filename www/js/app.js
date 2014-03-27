angular.module('hereApp', ['ionic', 'hereApp.services', 'hereApp.controllers', 'home'])

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
      
    });
  
	$urlRouterProvider.otherwise("/sidemenu/home");
	
});

