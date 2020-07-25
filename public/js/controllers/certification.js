/**
 * Created by AdrianAlejandro on 01/09/2016.
 */
'use strict';
var certificacion = angular.module('certificacion', []);
/**
 * Listar ARTICULO
 *
 */
certificacion.controller('view', function ($rootScope, $scope, $state, Certification, $modal, toaster, $log, SweetAlert, $stateParams) {
    $scope.certifications = []
    $scope.id = ($stateParams.id);
    $scope.certification = {};
    $scope.total = 0;
    $scope.params = {
        limit: 3,
        page: 0,
        flag: false,
        current: false,
        search: "",
    };
    Certification.getCertification({},{},function (data) {
        var certifications=data.data;
        for (var i in certifications)
            $scope.certifications.push(certifications[i]);
    },function (e) {

    });
});

certificacion.controller('CertificacionFiles', function ($rootScope, $scope, $state, Certification, $modal, toaster, $log, SweetAlert, $stateParams, FileUploader) {
    $scope.id = ($stateParams.id);
    $scope.certification = []
    Certification.get({id: $scope.id}, {}, function (data) {
        $scope.certification = data.data;
        $scope.initUpload($scope.certification.id);
    }, function (e) {

    });

    $scope.saveCertification = function () {

        $state.go('app.certificaciones.view', {id: $scope.certification.id});
    }
    $scope.initUpload = function (id) {
        var uploader = $scope.uploader = new FileUploader({
            url: API_SERVER + "CertificationFiles/" + id,
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

certificacion.controller('Certificacion',
    function ($rootScope, $scope, $state, Certification, $modal, $log, SweetAlert) {
        $scope.page = {title: "Cvu", subtitle: "Certification"};
        $scope.certificaciones = [];
        $scope.params = {
            limit: 10,
            page: 0,
            search: "",
            order: "name",
        };
        Certification.get($scope.params, function (data) {
            $scope.certificaciones = data.data;
            console.log(data.total);
        }, function (e) {


        });
        $scope.tituloactual = {};
        $scope.remove = function (item) {

            SweetAlert.swal({
                    title: "Estas seguro?",
                    text: "No podras recuperar esté curso!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55", confirmButtonText: "Si, eliminar",
                    cancelButtonText: "No, cancelar !",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        Certification.delete({id: item.id}, function (response) {
                            $scope.certificaciones.splice($scope.certificaciones.indexOf(item), 1);
                            SweetAlert.swal("Certificado !", "Eliminado", "success");
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('Certificados!', e.data.msg);
                            }

                        });
                    } else {
                        SweetAlert.swal("Certificados", "Cancelado :/", "error");
                    }
                });


        }
        $scope.open = function (item) {
            $scope.certificadoactual = item;
            var modalInstance = $modal.open({
                templateUrl: 'CertificationModal.html',
                controller: 'ModalControllerCertification',
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.certificadoactual;
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

certificacion.controller('AddCertification',
    function ($rootScope, $scope, $state, Certification, NgMap, SweetAlert) {
        $scope.certificacion = {};
        $scope.page = {title: "Cvu", subtitle: "Certificaciones"};
        $scope.errors = [];
        $scope.saveCertification = function () {
            Certification.save($scope.certificacion,function (data) {
                $state.go('app.cvu.certificacion');
            }, function (e) {
                if (parseInt(e.status) == 422) {
                    $scope.errors = e.data.errors;
                }
            });
        }
    }
);

certificacion.controller('ModalControllerCertification', function ($scope, $modalInstance, items, Certification, toaster, SweetAlert) {
    $scope.certificacion = items;
    $scope.errors = [];
    $scope.ok = function () {
        Certification.update({id: $scope.certificacion.id}, $scope.certificacion, function (response) {
            $scope.certificacion = response.data;

            $modalInstance.close($scope.certificacion);

            SweetAlert.swal("Certificaciones!", "Guardado correctamente !");
        }, function (error) {
            if (parseInt(error.status) == 422) {
                $scope.errors = error.data.errors;
                for (var i in $scope.errors)
                    toaster.error('Certificaciones!', $scope.errors[i][0]);
            }
        });

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})
