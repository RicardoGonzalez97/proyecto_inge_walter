/**
 * Created by Daniel Perez on 22/05/2016.
 */
var curso = angular.module('cursos', []);
/**
 * Listar Cursos
 *
 */
curso.controller('Cursos', function ($scope) {
    $scope.cursos = [
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
