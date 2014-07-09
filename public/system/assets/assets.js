'use strict';
angular.module('assetsMod', ['ngResource', 'ngTable'])
        .controller('assetsCtrl', ['$scope', 'ngTableParams', '$sce', '$http', '$resource', '$filter',
            function($scope, ngTableParams, $sce, $http, $resource, $filter) {
                $scope.assetResource = $resource('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/:asset_id', { asset_id: '@_id' }, 
                {
                    create: { method: 'POST'},
                    update: { method: 'PUT' }
                });
                $scope.data = { };
                $scope.newAsset = { };
                $scope.newValue = { };
                $scope.editAsset = false;
                $scope.totalAssets = 0;
                $scope.createAssetBool = false;
                $scope.addValueBool = false;


                $scope.getAssets = function () {
                    $scope.data.assets = $scope.assetResource.query(function() {
                        $scope.totalAssets = $scope.data.assets.length;
                        $scope.rowLimit = 100;
                    });
                };

                $scope.deleteAsset = function (asset) {
                    asset.$delete().then(function() {
                        $scope.data.assets.splice($scope.data.assets.indexOf(asset), 1);
                        $scope.totalAssets -= 1;
                    });
                };

                $scope.saveAsset = function (asset) {
                    asset.$update();
                };

                $scope.isEmpty = function (obj) {
                    return Object.keys(obj).length === 0;
                };

                $scope.createNewAsset = function(newAsset, newValue) {
                    console.log(newValue);
                    if(!$scope.isEmpty(newValue)) {
                        newAsset.values = [newValue];
                    }
                    if($scope.isEmpty(newAsset)) {
                        $scope.resetNewAsset(newAsset, newValue);
                    } else {
                        new $scope.assetResource(newAsset).$create().then(function(asset) {
                            $scope.data.assets.push(asset);
                            $scope.createAssetBool = false;
                            $scope.addValueBool = false;
                            $scope.totalAssets += 1;
                            for (var member in $scope.newAsset) delete $scope.newAsset[member];
                            for (var valMember in $scope.newValue) delete $scope.newValue[valMember];
                        });
                    }
                };

                $scope.resetNewAsset = function(newAsset, newValue) {
                    for (var member in $scope.newAsset) delete $scope.newAsset[member];
                    for (var valMember in $scope.newValue) delete $scope.newValue[valMember];                    
                    $scope.createAssetBool = false;
                    $scope.addValueBool = false;
           
                };


                $scope.getAssets();

                $scope.tableParams = new ngTableParams({
                    page:1,
                    total: $scope.totalAssets,
                    count: $scope.totalAssets + 5         //Need to be one more than total to turn pagination off in ngTable
                },
                {
                  counts:[ ]  
                });
            }
        ]);