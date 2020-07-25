/**
 * Created by T4B on 4/25/16.
 */

'use strict';
var tipocurso = angular.module('tipocurso', []);
/**
 * Listar Categorias de cursos
 *
 */
tipocurso.controller('Tiposcursos',
    function ($rootScope, $scope, $state, TypeCourseAdmin, $modal, $log, SweetAlert) {
        $scope.page={title:"Cursos",subtitle:"Tipos de curso"};
        $scope.tiposcursos = [];
        $scope.params={
            limit:10,
            page:0,
            name:"",
            order:"name",
        };
        TypeCourseAdmin.get($scope.params, function (data) {
            $scope.tiposcursos = data.data;
            console.log(data.total);
        },function (e) {


        });

        $scope.lineaactual = {};
        $scope.remove = function (item) {

            SweetAlert.swal({
                    title: "Estas seguro?",
                    text: "No podras recuperar esta categoría de curso!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55", confirmButtonText: "Si, eliminar",
                    cancelButtonText: "No, cancelar !",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        TypeCourseAdmin.delete({id: item.id}, function (response) {
                            $scope.tiposcursos.splice($scope.tiposcursos.indexOf(item), 1);
                            SweetAlert.swal("Tipos de Curso !", "Eliminada", "success");
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('Tipos de Curso!', e.data.msg);
                            }

                        });
                    } else {
                        SweetAlert.swal("Tipos de Curso", "Cancelado :)", "error");
                    }
                });


        }
        $scope.open = function (item) {
            $scope.lineaactual = item;
            var modalInstance = $modal.open({
                templateUrl: 'TypeCourseModal.html',
                controller: 'ModalControllerTypeCourse',
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.lineaactual;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    });
tipocurso.controller('AddtypeCourse',
    function ($rootScope, $scope, $state, TypeCourseAdmin) {

        $scope.page={title:"Cursos",subtitle:"Tipo de Curso"};
        $scope.tipocurso={};
        $scope.errors=[];
        $scope.saveTypeCourse=function(){
            TypeCourseAdmin.save($scope.tipocurso,function (data) {
                $state.go('app.cursos.tipocurso');
            },function (e) {
                if(parseInt(e.status)==422){
                    $scope.errors=e.data.errors;
                }
            });
        }
    });

tipocurso.controller('ModalControllerTypeCourse', function ($scope, $modalInstance, items, TypeCourseAdmin, toaster, SweetAlert) {
    $scope.tipocurso = items;
    $scope.errors = [];
    $scope.ok = function () {
        TypeCourseAdmin.update({id: $scope.tipocurso.id}, $scope.tipocurso, function (response) {
            $scope.tipocurso = response.data;

            $modalInstance.close($scope.tipocurso);

            SweetAlert.swal("Tipo de Curso!", "Guardado correctamente !");
        }, function (error) {
            if (parseInt(error.status) == 422) {
                $scope.errors = error.data.errors;
                for (var i in $scope.errors)
                    toaster.error('Tipo de Curso!', $scope.errors[i][0]);
            }
        });

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})
