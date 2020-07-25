/**
 * Created by T4B on 4/25/16.
 */

'use strict';
var user = angular.module('user', []);
/**
 * Listar Categorias de cursos
 *
 */
user.controller('Users',
    function ($rootScope, $scope, $state, Auth, $modal, $log, SweetAlert) {
        $scope.page={title:"Cursos",subtitle:"Categorías de curso"};
        $scope.users = [];
        $scope.params={
            limit:10,
            page:0,
            name:"",
            order:"name",
        };
        Auth.get($scope.params, function (data) {
            $scope.users = data.data;
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
                        CategoryCourseAdmin.delete({id: item.id}, function (response) {
                            $scope.categoriascursos.splice($scope.categoriascursos.indexOf(item), 1);
                            SweetAlert.swal("Categorías de Curso !", "Eliminada", "success");
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('Categorías de Curso!', e.data.msg);
                            }

                        });
                    } else {
                        SweetAlert.swal("Categorías de Curso", "Cancelado :)", "error");
                    }
                });


        }
        $scope.open = function (item) {
            $scope.lineaactual = item;
            var modalInstance = $modal.open({
                templateUrl: 'UserModal.html',
                controller: 'ModalControllerUser',
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
user.controller('AddUser',
    function ($rootScope, $scope, $state, Auth) {

      //  $scope.page={title:"Cursos",subtitle:"Categoría de Curso"};
        $scope.user={};
        $scope.errors=[];
        $scope.saveUser=function(){
            Auth.save($scope.categoriacurso,function (data) {
                $state.go('app.cursos.usuario');
            },function (e) {
                if(parseInt(e.status)==422){
                    $scope.errors=e.data.errors;
                }
            });
        }
    });

user.controller('ModalControllerUser', function ($scope, $modalInstance, items, Auth, toaster, SweetAlert) {
    $scope.user = items;
    $scope.errors = [];
    $scope.ok = function () {
        Auth.update({id: $scope.user.id}, $scope.user, function (response) {
            $scope.user = response.data;

            $modalInstance.close($scope.categoriacurso);

            SweetAlert.swal("Categorías de Curso!", "Guardado correctamente !");
        }, function (error) {
            if (parseInt(error.status) == 422) {
                $scope.errors = error.data.errors;
                for (var i in $scope.errors)
                    toaster.error('Categorías de Curso!', $scope.errors[i][0]);
            }
        });

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})