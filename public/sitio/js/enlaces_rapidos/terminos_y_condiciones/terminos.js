/**
 * Terminos y Condiciones
 */
'use strict';

var terminos = angular.module('terminos', []);
terminos.controller('Terminos', function ($scope, $auth, logout, toaster, $state, Profile) {
    $scope.terminoss = [
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