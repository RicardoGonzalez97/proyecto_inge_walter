/**
 * Created by AdrianAlejandro on 22/05/2016.
 */
'use strict';
var evaluador = angular.module('evaluador', []);
/**
 * Listar evaluadores de artículos
 *
 */


evaluador.controller('Evaluador',
    function ($rootScope, $scope, $state, EvaluatorArticle, $modal, $log, SweetAlert) {
        $scope.page={title:"Revista",subtitle:"Evaluadores"};
        $scope.evaluadores = [];
        $scope.params={
            limit:10,
            page:0,
            order:"name",
        };
        EvaluatorArticle.get($scope.params, function (data) {
            $scope.evaluadores = data.data;
            console.log(data.total);
        },function (e) {


        });

        $scope.lineaactual = {};
        $scope.remove = function (item) {

            SweetAlert.swal({
                    title: "Estas seguro?",
                    text: "No podras recuperar esta evalación!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55", confirmButtonText: "Si, eliminar",
                    cancelButtonText: "No, cancelar !",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        EvaluatorArticle.delete({id: item.id}, function (response) {
                            $scope.evaluadores.splice($scope.evaluadores.indexOf(item), 1);
                            SweetAlert.swal("Evaluadores!", "Eliminada", "success");
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('Evaluadores!', e.data.msg);
                            }

                        });
                    } else {
                        SweetAlert.swal("Evaluadores", "Cancelado :)", "error");
                    }
                });


        }
        $scope.open = function (item) {
            $scope.lineaactual = item;
            var modalInstance = $modal.open({
                templateUrl: 'EvaluatorArticleModal.html',
                controller: 'ModalControllerEvaluatorArticle',
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
evaluador.controller('AddEvaluador',
    function ($rootScope, $scope, $state, EvaluatorArticle) {

        $scope.page={title:"Revista",subtitle:"Evaluadores"};
        $scope.evaluador={};
        $scope.errors=[];
        $scope.saveEvaluatorArticle=function(){
            EvaluatorArticle.save($scope.evaluador,function (data) {
                $state.go('app.revista.evaluador');
            },function (e) {
                if(parseInt(e.status)==422){
                    $scope.errors=e.data.errors;
                }
            });
        }
    });
evaluador.controller('ModalControllerEvaluatorArticle', function ($scope, $modalInstance, items, EvaluatorArticle, toaster, SweetAlert) {
    $scope.evaluador = items;
    $scope.errors = [];
    $scope.ok = function () {
        EvaluatorArticle.update({id: $scope.evaluador.id}, $scope.evaluador, function (response) {
            $scope.evaluador = response.data;

            $modalInstance.close($scope.evaluador);

            SweetAlert.swal("Evaluadores!", "Guardado correctamente !");
        }, function (error) {
            if (parseInt(error.status) == 422) {
                $scope.errors = error.data.errors;
                for (var i in $scope.errors)
                    toaster.error('Evaluadores!', $scope.errors[i][0]);
            }
        });

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})
