'use strict';

var ayuda = angular.module('ayuda', []);

ayuda.controller('Ayuda', function ($scope, $auth, logout, toaster, $state, Profile) {
    $scope.ayudas = [
        {
            url: "revista/2016.pdf",
            name: "Convocatoria 2016."
        }
    ];
    $scope.evaluators = [
        {
            nombre: "",
            abstract: "",
            cv: "",
            email: "",
            telefono: "",
            web: "",
            image: "",
        }
    ];
});