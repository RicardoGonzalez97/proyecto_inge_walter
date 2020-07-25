
'use strict';
var titulo = angular.module('titulo', []);
/**
 * Listar ARTICULO
 *
 */
titulo.controller('view', function ($rootScope, $scope, $state, Title, $modal, toaster, $log, SweetAlert, $stateParams) {
    $scope.titles = []
    $scope.id = ($stateParams.id);
    $scope.title = {};
    $scope.total = 0;
    $scope.params = {
        limit: 3,
        page: 0,
        flag: false,
        current: false,
        search: "",
    };
    Title.getTitle({},{},function (data) {
        var titles=data.data;
        for (var i in titles)
            $scope.titles.push(titles[i]);
    },function (e) {

    });
});

titulo.controller('TituloFiles', function ($rootScope, $scope, $state, Title, $modal, toaster, $log, SweetAlert, $stateParams, FileUploader) {
    $scope.id = ($stateParams.id);
    $scope.title = []
    Title.get({id: $scope.id}, {}, function (data) {
        $scope.title = data.data;
        $scope.initUpload($scope.title.id);
    }, function (e) {

    });

    $scope.saveTitle = function () {

        $state.go('app.titulos.view', {id: $scope.title.id});
    }
    $scope.initUpload = function (id) {
        var uploader = $scope.uploader = new FileUploader({
            url: API_SERVER + "TitleFiles/" + id,
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

titulo.controller('Titulo',
    function ($rootScope, $scope, $state, Title, $modal, $log, SweetAlert) {
        $scope.page = {title: "Cvu", subtitle: "Title"};
        $scope.titulos = [];
        $scope.params = {
            limit: 10,
            page: 0,
            search: "",
            order: "name",
        };
        Title.get($scope.params, function (data) {
            $scope.titulos = data.data;
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
                        Title.delete({id: item.id}, function (response) {
                            $scope.titulos.splice($scope.titulos.indexOf(item), 1);
                            SweetAlert.swal("Titulo !", "Eliminado", "success");
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('Titulos!', e.data.msg);
                            }

                        });
                    } else {
                        SweetAlert.swal("Titulos", "Cancelado :/", "error");
                    }
                });


        }
        $scope.open = function (item) {
            $scope.tituloactual = item;
            var modalInstance = $modal.open({
                templateUrl: 'TitleModal.html',
                controller: 'ModalControllerTitle',
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.tituloactual;
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

titulo.controller('AddTitle',
    function ($rootScope, $scope, $state, Title, NgMap, SweetAlert) {
        $scope.titulo = {};
        $scope.page = {title: "Cvu", subtitle: "Titulos"};
        $scope.errors = [];
        $scope.saveTitle = function () {
            Title.save($scope.titulo,function (data) {
                $state.go('app.cvu.titulo');
            }, function (e) {
                if (parseInt(e.status) == 422) {
                    $scope.errors = e.data.errors;
                }
            });
        }
    }
);

titulo.controller('ModalControllerTitle', function ($scope, $modalInstance, items, Title, toaster, SweetAlert) {
    $scope.titulo = items;
    $scope.errors = [];
    $scope.ok = function () {
        Title.update({id: $scope.titulo.id}, $scope.titulo, function (response) {
            $scope.titulo = response.data;

            $modalInstance.close($scope.titulo);

            SweetAlert.swal("Titulos!", "Guardado correctamente !");
        }, function (error) {
            if (parseInt(error.status) == 422) {
                $scope.errors = error.data.errors;
                for (var i in $scope.errors)
                    toaster.error('Titulos!', $scope.errors[i][0]);
            }
        });

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})
