'use strict';
angular.module('myApp', ['ui.router', 'ngTable', 'assetsMod', 'ngResource'])
    //routing for the main module
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            // For unmatched routes:
            $urlRouterProvider.otherwise('/apps');
            // states for my app
            $stateProvider              
                .state('home', {
                    url: '/apps',
                    templateUrl: '/apps/apps.html',
                    controller: 'appsCtrl'
                })          
                .state('workspace', {
                    url: '/assets',
                    templateUrl: '/assets/assets.html',
                    controller: 'assetsCtrl'
                });
    }]);


    
