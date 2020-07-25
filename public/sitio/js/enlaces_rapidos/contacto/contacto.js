'use strict';

var contacto = angular.module('contacto', []);
contacto.controller('Contacto', function contactCtrl($scope, $http, $compile) {
    $scope.modalShow = false;
    $scope.rand1  = Math.floor(Math.random() * 10) +1;
    $scope.rand2  = Math.floor(Math.random() * 10) +1;

    $scope.addNums = function (){
        var answer = $scope.suma;
        var digit1 = $scope.rand1;
        var digit2 = $scope.rand2;
        var sum = digit1 + digit2;
        if (answer == ""){
            alert("looks like you forot something, hint it´s the math question");
            $scope.rand1 = Math.floor(Math.random() * 10) +1;
            $scope.rand2 = Math.floor(Math.random() * 10) +1;
            return false;
        }else if(answer != sum){
            alert("do you need a  calculator? don´t feel bad, math is not for everyone");
            $scope.rand1 = Math.floor(Math.random() * 10) +1;
            $scope.rand2 = Math.floor(Math.random() * 10) +1;
            return false;
        }else {
            return true;
        }
    }
    $scope.sendmail = function () {
        $scope.success = "";

        if ($scope.addNums()) {
            $http({
                method: 'POST',
                url: 'sendmail.php',
                data: 'nombre=:'+$scope.nombre + '&email='+$scope.email+'&consulta='+$scope.consulta,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).

            success(function (data, status) {
                // Set  the data of the status
                $scope.resultado = data;
                $scope.nombre =" ";
                $scope.email =" ";
                $scope.consulta =" ";
                $scope.suma = " ";
                $scope.rand1 = Math.floor(Math.random() *10) +1;
                $scope.rand2 = Math.floor(Math.random() *10) +1;
                $scope.success = "El correo se envió :)";


            }).
            error(function (data, status) {
                $scope.data = data || "Request  failed";
                $scope.status = status;

            });
        }
    }
});
