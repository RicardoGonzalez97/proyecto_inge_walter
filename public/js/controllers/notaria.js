/**
 * Created by Adrian Espinosa on 01/04/2017.
 */
'use strict';
var notari = angular.module('notari', []);
/**
 * Listar Notarias
 *
 */
notari.controller('Notaris',
    function ($rootScope, $scope, $state, Notaria, $modal, $log, SweetAlert) {
        $scope.page={title:"Cursos",subtitle:"Notarias"};
        $scope.notaris = [];
        $scope.params={
            limit:10,
            page:0,
            name:"",
            order:"name",
        };
        Notaria.get($scope.params, function (data) {
            $scope.notaris = data.data;
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
                        Notarias.delete({id: item.id}, function (response) {
                            $scope.notaris.splice($scope.notaris.indexOf(item), 1);
                            SweetAlert.swal("Tipos de Curso !", "Eliminada", "success");
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('Notaria!', e.data.msg);
                            }

                        });
                    } else {
                        SweetAlert.swal("Notarias", "Cancelado :)", "error");
                    }
                });


        }
        $scope.open = function (item) {
            $scope.lineaactual = item;
            var modalInstance = $modal.open({
                templateUrl: 'NotariaModal.html',
                controller: 'ModalControllerNotaria',
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
notari.controller('Addnotarias',
    function ($rootScope, $scope, $state, Notaria, Students) {

        $scope.page={title:"Cursos",subtitle:"Notaria"};
        $scope.notari={};
        $scope.errors=[];
        $scope.saveNotaria=function(){
            Notaria.save($scope.notari,function (data) {
                $state.go('app.cursos.notari');
            },function (e) {
                if(parseInt(e.status)==422){
                    $scope.errors=e.data.errors;
                }
            });
        }
        $scope.Students = [];
        Students.get({}, {}, function (data) {
            $scope.Students = data.data;
        }, function (e) {
        });
    }
);
notari.controller('ModalControllerNotaria', function ($scope, $modalInstance, items, Notaria, toaster, SweetAlert) {
    $scope.notari = items;
    $scope.errors = [];
    $scope.ok = function () {
        Notaria.update({id: $scope.notari.id}, $scope.notari, function (response) {
            $scope.notari = response.data;

            $modalInstance.close($scope.notari);

            SweetAlert.swal("Notaria!", "Guardado correctamente !");
        }, function (error) {
            if (parseInt(error.status) == 422) {
                $scope.errors = error.data.errors;
                for (var i in $scope.errors)
                    toaster.error('Notaria!', $scope.errors[i][0]);
            }
        });

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})