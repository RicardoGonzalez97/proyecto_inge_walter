/**
 * Created by AdrianAlejandro on 01/09/2016.
 */
'use strict';
var premio = angular.module('premio', []);
/**
 * Listar ARTICULO
 *
 */
premio.controller('view', function ($rootScope, $scope, $state, Award, $modal, toaster, $log, SweetAlert, $stateParams) {
    $scope.awards = []
    $scope.id = ($stateParams.id);
    $scope.award = {};
    $scope.total = 0;
    $scope.params = {
        limit: 3,
        page: 0,
        flag: false,
        current: false,
        search: "",
    };
    Award.getAward({},{},function (data) {
        var awards=data.data;
        for (var i in awards)
            $scope.awards.push(awards[i]);
    },function (e) {

    });
});

premio.controller('TituloFiles', function ($rootScope, $scope, $state, Award, $modal, toaster, $log, SweetAlert, $stateParams, FileUploader) {
    $scope.id = ($stateParams.id);
    $scope.award = []
    Award.get({id: $scope.id}, {}, function (data) {
        $scope.award = data.data;
        $scope.initUpload($scope.award.id);
    }, function (e) {

    });

    $scope.saveAward = function () {

        $state.go('app.cvu.premio', {id: $scope.award.id});
    }
    $scope.initUpload = function (id) {
        var uploader = $scope.uploader = new FileUploader({
            url: API_SERVER + "AwardFiles/" + id,
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

premio.controller('Premio',
    function ($rootScope, $scope, $state, Award, $modal, $log, SweetAlert) {
        $scope.page = {title: "Cvu", subtitle: "Award"};
        $scope.premios = [];
        $scope.params = {
            limit: 10,
            page: 0,
            search: "",
            order: "name",
        };
        Award.get($scope.params, function (data) {
            $scope.premios = data.data;
            // console.log(data.total);
        }, function (e) {


        });
        $scope.premioactual = {};
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
                        Award.delete({id: item.id}, function (response) {
                            $scope.premios.splice($scope.premios.indexOf(item), 1);
                            SweetAlert.swal("Premio !", "Eliminado", "success");
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('Premios!', e.data.msg);
                            }

                        });
                    } else {
                        SweetAlert.swal("Premios", "Cancelado :/", "error");
                    }
                });


        }
        $scope.open = function (item) {
            $scope.premioactual = item;
            var modalInstance = $modal.open({
                templateUrl: 'AwardModal.html',
                controller: 'ModalControllerAward',
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.premioactual;
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

premio.controller('AddAward',
    function ($rootScope, $scope, $state, Award, NgMap, SweetAlert) {
        $scope.premio = {};
        $scope.page = {title: "Cvu", subtitle: "Premios"};
        $scope.errors = [];
        $scope.saveAward = function () {
            Award.save($scope.premio,function (data) {
                $state.go('app.cvu.premio');
            }, function (e) {
                if (parseInt(e.status) == 422) {
                    $scope.errors = e.data.errors;
                }
            });
        }
    }
);

premio.controller('ModalControllerAward', function ($scope, $modalInstance, items, Award, toaster, SweetAlert) {
    $scope.premio = items;
    $scope.errors = [];
    $scope.ok = function () {
        Award.update({id: $scope.premio.id}, $scope.premio, function (response) {
            $scope.premio = response.data;

            $modalInstance.close($scope.premio);

            SweetAlert.swal("Premios!", "Guardado correctamente !");
        }, function (error) {
            if (parseInt(error.status) == 422) {
                $scope.errors = error.data.errors;
                for (var i in $scope.errors)
                    toaster.error('Premios!', $scope.errors[i][0]);
            }
        });

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})
