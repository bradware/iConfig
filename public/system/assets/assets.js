'use strict';

angular.module('assetsMod', ['ngResource', 'ngTable'])
        .controller('assetsCtrl', ['$scope', 'ngTableParams', '$sce', '$http', '$resource', '$filter',
            function($scope, ngTableParams, $sce, $http, $resource, $filter) {
                $scope.assetResource = $resource('/apps/53c9542826d6fc0000774b7f/assets/:asset_id', { asset_id: '@_id' }, 
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
                $scope.assetList = [ ];


                $scope.getAssets = function () {
                    $scope.data.assets = $scope.assetResource.query(function() {
                        $scope.totalAssets = $scope.data.assets.length;
                        $scope.rowLimit = 100;
                    });
                };

                $scope.getEnglishValues = function(asset) {
                    var englishValues = [ ];
                    for(var index = 0; index < asset.values.length; index++) {
                        if(asset.values[index].locale_code === 'en_US') {
                            englishValues.push(asset.values[index]);
                        }
                    }
                    return englishValues;
                };

                $scope.getSpanishValues = function(asset) {
                    var spanishValues = [ ];
                    for(var index = 0; index < asset.values.length; index++) {
                        if(asset.values[index].locale_code === 'es_ES') {
                            spanishValues.push(asset.values[index]);
                        }
                    }
                    return spanishValues;
                };


                $scope.updateAssetList = function(asset) {
                    if ($scope.assetList.indexOf(asset) === -1) {
                        $scope.assetList.unshift(asset);
                    }
                    else {
                        $scope.assetList.splice($scope.assetList.indexOf(asset), 1);
                    }
                };

                $scope.deleteManyAssets = function() {
                    if($scope.assetList.length === 0) {
                        console.log('AssetList is Empty');
                    } 
                    else {
                        for(var index = 0; index < $scope.assetList.length; index++) {
                            $scope.deleteAsset($scope.assetList[index], true);
                        }
                    }
                    $scope.totalAssets = $scope.totalAssets - $scope.assetList.length;
                    $scope.assetList = [ ];
                };

                $scope.deleteAsset = function (asset, calledFromParent) {
                    if(calledFromParent) {
                        asset.$delete().then(function() {
                            $scope.data.assets.splice($scope.data.assets.indexOf(asset), 1);
                            $scope.totalAssets -= 1;
                        });
                    } 
                    else {
                        event.srcElement.className = 'assetDeleted';
                        event.srcElement.parentElement.parentElement.parentElement.parentElement.className = 'animated fadeOutUp';
                        setTimeout(function() {
                        asset.$delete().then(function() {
                                $scope.data.assets.splice($scope.data.assets.indexOf(asset), 1);
                                $scope.totalAssets -= 1;
                        });
                        }, 500);
                    }   
                };

                $scope.saveAsset = function (asset) {
                    asset.$update();
                    asset.editThisAsset = false;
                };

                $scope.isEmpty = function (obj) {
                    return Object.keys(obj).length === 0;
                };

                $scope.validAsset = function(newAsset) {
                    if($scope.newAsset) {
                        if($scope.newAsset.name && $scope.newAsset.name.length !== 0 && $scope.newAsset.status && 
                            $scope.newAsset.status.length !== 0 && $scope.newAsset.created_by && 
                                $scope.newAsset.created_by.length !== 0) {
                                    return true;
                        }
                    }
                    return false;
                };

                $scope.validValue = function(newValue) {
                    if($scope.addValueBool) {
                        if($scope.newValue) {
                            if($scope.newValue.string && $scope.newValue.string.length !== 0 && $scope.newValue.status && 
                                $scope.newValue.status.length !== 0 && $scope.newValue.created_by && 
                                    $scope.newValue.created_by.length !== 0 && $scope.newValue.locale_code && 
                                    $scope.newValue.locale_code.length !== 0) {
                                        return true;
                            } else {
                                return false;
                            }
                        }
                    }
                    return true;
                };

                $scope.createNewAsset = function(newAsset, newValue) {
                    if(!$scope.isEmpty(newValue)) {
                        newAsset.values = [newValue];
                    }
                    if($scope.isEmpty(newAsset)) {
                        $scope.resetNewAsset(newAsset, newValue);
                    } else {
                        new $scope.assetResource(newAsset).$create().then(function(asset) {
                            $scope.data.assets.unshift(asset);
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