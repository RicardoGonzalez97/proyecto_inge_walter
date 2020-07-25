/**
 * Created by AdrianAlejandro on 30/08/2016.
 */
'use strict';
var cvu = angular.module('cvu', []);
/**
 * Listar Cursos
 *
 */
cvu.controller('Cvu', function ($scope) {
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