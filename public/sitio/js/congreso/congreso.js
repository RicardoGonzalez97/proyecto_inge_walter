var congreso = angular.module('congresos', []);
/**
 * Listar Cursos
 *
 */
congreso.controller('Congresos', function ($scope) {
    $scope.congresos = [
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
/**
 * Created by Daniel Perez on 22/05/2016.
 */
