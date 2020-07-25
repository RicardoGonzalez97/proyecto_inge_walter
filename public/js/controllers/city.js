/**
 * Created by T4B on 4/25/16.
 */

'use strict';
var ciudad = angular.module('ciudad', []);
/**
 * Listar Ciudades
 *
 */
ciudad.controller('Ciudad',
    function ($rootScope, $scope, $state, City) {
        $scope.page={title:"Revista",subtitle:"Ciudades"};
        $scope.ciudades = [];
        $scope.params={
            limit:10,
            page:0,
            name:"",
            order:"name",
        };
        City.get($scope.params, function (data) {
            $scope.ciudades = data.data;
            console.log(data.total);
        },function (e) {


        });
    });

ciudad.controller('AddCity',
    function ($rootScope, $scope, $state, City) {
        $scope.page={title:"Revista",subtitle:"Ciudades"};
        $scope.ciudad={};
        $scope.errors=[];
        $scope.saveCity=function(){
            City.save($scope.ciudad,function (data) {
                $state.go('app.revista.ciudad');
            },function (e) {
                if(parseInt(e.status)==422){
                    $scope.errors=e.data.errors;
                }
            });
        }
    });
