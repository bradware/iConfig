'use strict';
angular.module('myApp', ['ui.router', 'ngTable', 'assetsMod', 'ngResource'])
    //routing for the main module
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            // For unmatched routes:
            $urlRouterProvider.otherwise('/home');
            // states for my app
            $stateProvider              
                .state('home', {
                    url: '/apps',
                    templateUrl: '/index.html'
                })          
                .state('workspace', {
                    url: '/assets',
                    templateUrl: '/assets/assets.html',
                    controller: 'assetsCtrl'
                });
    }]);


    
