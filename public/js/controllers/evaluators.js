/**
 * Created by T4B on 4/25/16.
 */
'use strict';
var evaluar = angular.module('evaluar', []);
/**
 * Listar evaluadores
 *
 */

evaluar.controller('view', function ($rootScope, $scope, $state, Evaluators, $modal, toaster, $log, SweetAlert, $stateParams) {
    $scope.evaluatorss=[]
    Evaluators.get({},{},function (data) {
        var evaluatorss=data.data;
        for (var i in evaluatorss)
            $scope.evaluatorss.push(evaluatorss[i]);
    },function (e) {

    });
});

evaluar.controller('EvaluarFiles', function ($rootScope, $scope, $state, Evaluators, $modal, toaster, $log, SweetAlert, $stateParams, FileUploader) {
    $scope.id = ($stateParams.id);
    $scope.evaluators = []
    Evaluators.get({id: $scope.id}, {}, function (data) {
        $scope.evaluators = data.data;
        $scope.initUpload($scope.evaluators.id);
    }, function (e) {

    });



    $scope.saveEvaluators = function () {

        $state.go('app.revista.views', {id: $scope.evaluators.id});
    }
    $scope.initUpload = function (id) {
        var uploader = $scope.uploader = new FileUploader({
            url: API_SERVER + "EvaluatorsFiles/" + id,
        });
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            if (parseInt(status) == 422) {
                for (var i in response.errors)
                    toaster.pop("error", "error", response.errors[i][0]);
            }
        };
        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };
    }

});

evaluar.controller('Evaluar',
    function ($rootScope, $scope, $state, Evaluators, $modal, $log, SweetAlert) {
        $scope.page={title:"Revista",subtitle:"Evaluars"};
        $scope.evaluars = [];
        $scope.params={
            limit:10,
            page:0,
            order:"name",
        };
        Evaluators.get($scope.params, function (data) {
            $scope.evaluars = data.data;
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
                        Evaluators.delete({id: item.id}, function (response) {
                            $scope.evaluars.splice($scope.evaluars.indexOf(item), 1);
                            SweetAlert.swal("Evaluaciones!", "Eliminada", "success");
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('Evaluaciones!', e.data.msg);
                            }

                        });
                    } else {
                        SweetAlert.swal("Evaluaciones", "Cancelado :)", "error");
                    }
                });


        }
        $scope.open = function (item) {
            $scope.lineaactual = item;
            var modalInstance = $modal.open({
                templateUrl: 'EvaluatorsModal.html',
                controller: 'ModalControllerEvaluators',
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
evaluar.controller('AddEvaluar',
    function ($rootScope, $scope, $state, Evaluators, Article) {

        $scope.page={title:"Revista",subtitle:"Evaluars"};
        $scope.evaluar={};
        $scope.errors=[];
        $scope.Article = [];
        Article.get({}, {}, function (data) {
            $scope.Article = data.data;
        }, function (e) {

        });
        $scope.saveEvaluators=function(){
            Evaluators.save($scope.evaluar,function (data) {
                $state.go('app.revista.addfiless');
            },function (e) {
                if(parseInt(e.status)==422){
                    $scope.errors=e.data.errors;
                }
            });
        }
    });
evaluar.controller('ModalControllerEvaluators', function ($scope, $modalInstance, items, Evaluators, toaster, SweetAlert) {
    $scope.evaluar = items;
    $scope.errors = [];
    $scope.ok = function () {
        Evaluators.update({id: $scope.evaluar.id}, $scope.evaluar, function (response) {
            $scope.evaluar = response.data;

            $modalInstance.close($scope.evaluar);

            SweetAlert.swal("Evaluaciones!", "Guardado correctamente !");
        }, function (error) {
            if (parseInt(error.status) == 422) {
                $scope.errors = error.data.errors;
                for (var i in $scope.errors)
                    toaster.error('Evaluaciones!', $scope.errors[i][0]);
            }
        });

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})

