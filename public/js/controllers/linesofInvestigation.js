/**
 * Created by T4B on 4/25/16.
 */

'use strict';
var lineainvestigacion = angular.module('lineainvestigacion', []);
/**
 * Listar Líneas de investigación
 *
 */

lineainvestigacion.controller('Lineainvestigacion',
    function ($rootScope, $scope, $state, LinesofInvestigation, $modal, $log, SweetAlert) {
        $scope.page = {title: "Revista", subtitle: "Líneas de investigación"};
        $scope.lineasinvestigaciones = [];
        $scope.params = {
            limit: 10,
            page: 0,
            search: "",
            order: "name",
        };
        LinesofInvestigation.get($scope.params, function (data) {
            $scope.lineasinvestigaciones = data.data;
            console.log(data.total);
        }, function (e) {


        });
        $scope.lineaactual = {};
        $scope.remove = function (item) {

            SweetAlert.swal({
                    title: "Estas seguro?",
                    text: "No podras recuperar esta linea de investigación!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55", confirmButtonText: "Si, eliminar",
                    cancelButtonText: "No, cancelar !",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        LinesofInvestigation.delete({id: item.id}, function (response) {
                            $scope.lineasinvestigaciones.splice($scope.lineasinvestigaciones.indexOf(item), 1);
                            SweetAlert.swal("Lineas de Investigación !", "Eliminada", "success");
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toaster.error('Lineas de Investigación!', e.data.msg);
                            }

                        });
                    } else {
                        SweetAlert.swal("Lineas de Investigación", "Cancelado :)", "error");
                    }
                });


        }
        $scope.open = function (item) {
            $scope.lineaactual = item;
            var modalInstance = $modal.open({
                templateUrl: 'LinesofInvestigationModal.html',
                controller: 'ModalController',
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
lineainvestigacion.controller('AddlinesofInvestigation',
    function ($rootScope, $scope, $state, LinesofInvestigation) {

        $scope.page = {title: "Revista", subtitle: "Líneas de investigación"};
        $scope.lineainvestigacion = {};
        $scope.errors = [];
        $scope.saveLinesofInvestigation=function(){
            LinesofInvestigation.save($scope.lineainvestigacion, function (data) {
                $state.go('app.revista.lineainvestigacion');
            }, function (e) {
                if (parseInt(e.status) == 422) {
                    $scope.errors = e.data.errors;
                }
            });
        }
    });


lineainvestigacion.controller('ModalController', function ($scope, $modalInstance, items, LinesofInvestigation, toaster, SweetAlert) {
    $scope.lineainvestigacion = items;
    $scope.errors = [];
    $scope.ok = function () {
        LinesofInvestigation.update({id: $scope.lineainvestigacion.id}, $scope.lineainvestigacion, function (response) {
            $scope.lineainvestigacion = response.data;

            $modalInstance.close($scope.lineainvestigacion);

            SweetAlert.swal("Lineas de Investigación!", "Guardado correctamente !");
        }, function (error) {
            if (parseInt(error.status) == 422) {
                $scope.errors = error.data.errors;
                for (var i in $scope.errors)
                    toaster.error('Lineas de Investigación!', $scope.errors[i][0]);
            }
        });

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})