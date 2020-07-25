/**
 * Preguntas Frecuentes
 */
'use strict';

var preguntas = angular.module('preguntas', []);
preguntas.controller('Preguntas', function ($scope, $auth, logout, toaster, $state, Profile) {
    $scope.preguntass = [
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
function cambiar(esto)
{
    preguntas=document.getElementById(esto).style.display;
    if (preguntas=='none')
        preguntas='block';
    else
        preguntas='none';

    document.getElementById(esto).style.display = preguntas;
}
