'use strict';
angular.module('appsMod', ['ngResource', 'ngTable'])
        .controller('appsCtrl', ['$scope', 'ngTableParams', '$sce', '$http', '$resource', '$filter',
            function($scope, ngTableParams, $sce, $http, $resource, $filter) {
                $scope.showDropdown = false;
            }
        ]);