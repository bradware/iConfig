'use strict';
angular.module('appsMod', [ ])
        .controller('appsCtrl', ['$scope',
            function($scope) {
                $scope.showDropdown = false;

                $scope.dropdownClicked = function() {
                    event.stopPropagation();
                    $scope.showDropdown = !$scope.showDropdown;
                }
            }
        ]);