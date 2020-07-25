/**
 * Created by T4B on 4/25/16.
 */

'use strict';
var estado = angular.module('estado', []);
/**
 * Listar Estados
 *
 */
estado.controller('Estado',
    function ($rootScope, $scope, $state, State) {
        $scope.page={title:"Revista",subtitle:"Estados"};
        $scope.estados = [];
        $scope.params={
            limit:10,
            page:0,
            name:"",
            order:"name",
        };
        State.get($scope.params, function (data) {
            $scope.estados = data.data;
            console.log(data.total);
        },function (e) {


        });
    });
estado.controller('AddState',
    function ($rootScope, $scope, $state, State) {

        $scope.page={title:"Revista",subtitle:"Estados"};
        $scope.estado={};
        $scope.errors=[];
        $scope.saveState=function(){
            State.save($scope.estado,function (data) {
                $state.go('app.revista.estado');
            },function (e) {
                if(parseInt(e.status)==422){
                    $scope.errors=e.data.errors;
                }
            });
        }
    });

