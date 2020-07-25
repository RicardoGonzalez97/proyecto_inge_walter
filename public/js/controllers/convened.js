/**
 * Created by Adrian on 4/25/16.
 */
'use strict';
var convocatoria = angular.module('convocatoria', []);
/**
 * Listar convocatias
 *
 */
convocatoria.controller('view', function ($rootScope, $scope, $state, Convened, $modal, toaster, $log, SweetAlert, $stateParams) {
    $scope.conveneds=[]
    Convened.get({},{},function (data) {
        var conveneds=data.data;
        for (var i in conveneds)
            $scope.conveneds.push(conveneds[i]);
    },function (e) {

    });
});

convocatoria.controller('ConvocatoriaFiles', function ($rootScope, $scope, $state, Convened, $modal, toaster, $log, SweetAlert, $stateParams, FileUploader) {
    $scope.id = ($stateParams.id);
    $scope.convened = []
    Convened.get({id: $scope.id}, {}, function (data) {
        $scope.convened = data.data;
        $scope.initUpload($scope.convened.id);
    }, function (e) {

    });



    $scope.saveConvened = function () {

        $state.go('app.revista.vista', {id: $scope.convened.id});
    }
    $scope.initUpload = function (id) {
        var uploader = $scope.uploader = new FileUploader({
            url: API_SERVER + "ConvenedFiles/" + id,
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

        var image = $scope.image = new FileUploader({
            url: API_SERVER + "ConvenedImages/" + id,
        });
        image.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return 'BMP|bmp|png|PNG|jpg|jpeg|JPG|JPEG'.indexOf(type) !== -1 & this.queue.length < 10;
            }
        });
        image.onErrorItem = function (fileItem, response, status, headers) {
            if (parseInt(status) == 422) {
                for (var i in response.errors)
                    toaster.pop("error", "error", response.errors[i][0]);
            }
        };
        image.onCompleteAll = function () {
            console.info('onCompleteAll');
        };
        
    }
});

convocatoria.controller('Convocatoria',
    function ($rootScope, $scope, $state, Convened, $modal, $log, SweetAlert) {
        $scope.page={title:"Revista",subtitle:"Convocatorias"};
        $scope.convocatorias = [];
        $scope.params={
            limit:10,
            page:0,
            name:"",
            order:"name",
        };
        Convened.get($scope.params, function (data) {
            $scope.convocatorias = data.data;
            console.log(data.total);
        },function (e) {

        });

        $scope.lineaactual = {};
        $scope.remove = function (item) {

            SweetAlert.swal({
                    title: "Estas seguro?",
                    text: "No podras recuperar esta convocatoria!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55", confirmButtonText: "Si, eliminar",
                    cancelButtonText: "No, cancelar !",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        Convened.delete({id: item.id}, function (response) {
                            $scope.convocatorias.splice($scope.convocatorias.indexOf(item), 1);
                            SweetAlert.swal("Convocatorias !", "Eliminada", "success");
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('Convocatorias!', e.data.msg);
                            }

                        });
                    } else {
                        SweetAlert.swal("Convocatorias", "Cancelado :)", "error");
                    }
                });


        }
        $scope.open = function (item) {
            $scope.lineaactual = item;
            var modalInstance = $modal.open({
                templateUrl: 'ConvenedModal.html',
                controller: 'ModalControllerConvened',
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
convocatoria.controller('AddConvocatoria',
    function ($rootScope, $scope, $state, Convened) {

        $scope.page={title:"Revista",subtitle:"Convocatorias"};
        $scope.convocatoria={};
        $scope.errors=[];
        $scope.saveConvened=function(){
            Convened.save($scope.convocatoria,function (data) {
                $state.go('app.revista.addarchivo', {
                    id: data.data.id
                });
            },function (e) {
                if(parseInt(e.status)==422){
                    $scope.errors=e.data.errors;
                }
            });
        }
    }
);

convocatoria.controller('ModalControllerConvened', function ($scope, $modalInstance, items, Convened, toaster, SweetAlert) {
    $scope.convocatoria = items;
    $scope.errors = [];
    $scope.ok = function () {
        Convened.update({id: $scope.convocatoria.id}, $scope.convocatoria, function (response) {
            $scope.convocatoria = response.data;
            $modalInstance.close($scope.convocatoria);
            SweetAlert.swal("Convocatorias!", "Guardado correctamente !");
        }, function (error) {
            if (parseInt(error.status) == 422) {
                $scope.errors = error.data.errors;
                for (var i in $scope.errors)
                    toaster.error('Convocatorias!', $scope.errors[i][0]);
            }
        });

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})