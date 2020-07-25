/**
 * Created by Jessica Rincón on 01/04/2017.
 */
'use strict';
var estudiantes = angular.module('estudiantes', []);
/**
 * Listar Notarias
 *
 */

estudiantes.controller('ModalControllerStudents', function ($scope, $modalInstance, items, Students, toaster, SweetAlert) {

    $scope.page={title:"Cursos",subtitle:"Estudiantes"};
    $scope.estudiantess = [];
    $scope.params={
        limit:10,
        page:0,
        name:"",
        order:"name",
    };
    StudensForCourseController.get($scope.params, function (data) {
        $scope.estudiantess = data.data;
        console.log(data.total);
    },function (e) {

    });

    /*
     * Acá vamos a trabajar en crear una función para activacion de constancias por parte del Instructor.
     * A los alumnos que asistieron al curso.
     *
     */


    /*
     * Aca termina
     * */

})