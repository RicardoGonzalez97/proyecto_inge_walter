/**
 * ¿Quienes somos?
 */
'use strict';

var quienes = angular.module('quienes', []);
quienes.controller('Quienes', function ($scope, $auth, logout, toaster, $state, Profile) {
    $scope.quieness = [
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