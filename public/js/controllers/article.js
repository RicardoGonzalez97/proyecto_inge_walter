
'use strict';
var articulo = angular.module('articulo', []);
/**
 * Listar ARTICULO
 *
 */

articulo.controller('view', function ($rootScope, $scope, $state, Article, $modal, toaster, $log, SweetAlert, $stateParams) {
    $scope.articles=[]
    Article.get({},{},function (data) {
        var articles=data.data;
        for (var i in articles)
            $scope.articles.push(articles[i]);
    },function (e) {

    });
});

articulo.controller('ArticuloFiles', function ($rootScope, $scope, $state, Article, $modal, toaster, $log, SweetAlert, $stateParams, FileUploader) {
    $scope.id = ($stateParams.id);
    $scope.article = []
    Article.get({id: $scope.id}, {}, function (data) {
        $scope.article = data.data;
        $scope.initUpload($scope.article.id);
    }, function (e) {

    });



    $scope.saveArticle = function () {

        $state.go('app.revista.view', {id: $scope.article.id});
    }
    $scope.initUpload = function (id) {
        var uploader = $scope.uploader = new FileUploader({
            url: API_SERVER + "ArticleFiles/" + id,
        });

        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return 'BMP|bmp|png|PNG|jpg|jpeg|JPG|JPEG'.indexOf(type) !== -1 & this.queue.length < 10;
            }
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

articulo.controller('Articulo',
    function ($rootScope, $scope, $state, Article, $modal, $log, SweetAlert) {
        $scope.page = {title: "Revista", subtitle: "Articulo"};
        $scope.articulos = [];
        $scope.params = {
            limit: 10,
            page: 0,
            search: "",
            order: "name",
        };
        Article.get($scope.params, function (data) {
            $scope.articulos = data.data;
            // console.log(data.total);
        }, function (e) {


        });
        $scope.lineaactual = {};
        $scope.remove = function (item) {

            SweetAlert.swal({
                    title: "Estas seguro?",
                    text: "No podras recuperar este Articulo!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55", confirmButtonText: "Si, eliminar",
                    cancelButtonText: "No, cancelar !",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        Article.delete({id: item.id}, function (response) {
                            $scope.articulos.splice($scope.articulos.indexOf(item), 1);
                            SweetAlert.swal("Articulo !", "Eliminada", "success");
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('Articulos!', e.data.msg);
                            }

                        });
                    } else {
                        SweetAlert.swal("Articulo", "Cancelado :)", "error");
                    }
                });


        }
        $scope.open = function (item) {
            $scope.lineaactual1 = item;
            var modalInstance = $modal.open({
                templateUrl: 'ArticleModal.html',
                controller: 'ModalController',
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.lineaactual1;
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
articulo.controller('Add',
    function ($rootScope, $scope, $state, Article, LinesofInvestigation, Convened) {

        $scope.articulo = {};
        $scope.LinesofInvestigation = [];
        $scope.Convened = [];
        LinesofInvestigation.get({}, {}, function (data) {
            $scope.LinesofInvestigation = data.data;
        }, function (e) {

        });

        Convened.get({}, {}, function (data) {
            $scope.Convened = data.data;
        }, function (e) {

        });

        $scope.page = {title: "Revista", subtitle: "Articulo"};
        $scope.errors = [];
        $scope.saveArticle = function () {
            Article.save($scope.articulo, function (data) {
                $state.go('app.revista.addfiles', {
                    id: data.data.id
                });
            }, function (e) {
                if (parseInt(e.status) == 422) {
                    $scope.errors = e.data.errors;
                }
            });
        }
    });


articulo.controller('ModalController', function ($scope, $modalInstance, items, Article, toaster, SweetAlert) {
    $scope.articulo = items;
    $scope.errors = [];
    $scope.ok = function () {
        Article.update({id: $scope.articulo.id}, $scope.articulo, function (response) {
            $scope.articulo = response.data;

            $modalInstance.close($scope.articulo);

            SweetAlert.swal("Articulo!", "Guardado correctamente !");
        }, function (error) {
            if (parseInt(error.status) == 422) {
                $scope.errors = error.data.errors;
                for (var i in $scope.errors)
                    toaster.error('Articulo!', $scope.errors[i][0]);
            }
        });

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})