/**
 * Created by AdrianAlejandro on 07/11/2016.
 */
'use strict';
var conferencias = angular.module('conferencias', []);
conferencias.controller('Conferencias', function ($scope, $auth, logout, toaster, $state, Profile) {
    $scope.conferenciass = [
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