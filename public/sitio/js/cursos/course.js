/**
 * Created by Daniel Perez on 25/06/2016.
 */
'use strict';
var curso = angular.module('curso', []);
/**
 * Listar Cursos
 *
 */
curso.controller('Cursos', function ($scope) {
    $scope.cursoss = [
        {
            url: "revista/2016.pdf",
            name: "Convocatoria 2016."
        }
    ];
});
curso.controller('AddCourse',
    function ($rootScope, $scope, $state, Course, NgMap, CategoryCourse, TypeCourse, SweetAlert) {

        $scope.lat = 16.7531803;
        $scope.lng = -93.1127416;
        $scope.curso = {};
        $scope.curso.lat = $scope.lat;
        $scope.curso.lng = $scope.lng;
        $scope.curso.direction = "Carr. Panamericana 4106, Boulevares, 29020 Tuxtla Gutiérrez, Chis., México";
        $scope.center ="Carr. Panamericana 4106, Boulevares, 29020 Tuxtla Gutiérrez, Chis., México";
        NgMap.getMap().then(function (map) {
            $scope.map = map;
            $rootScope.map = map;
        });
        var geocoder = new google.maps.Geocoder();
        $scope.setNewPosition = function (Marker) {
            var LatLng = Marker.latLng;
            $scope.lat = LatLng.lat();
            $scope.lng = LatLng.lng();
            $scope.center = '' + $scope.lat + ',' + $scope.lng;
            $scope.curso.lat = $scope.lat;
            $scope.curso.lng = $scope.lng;
            var latlng = new google.maps.LatLng(parseFloat($scope.lat), parseFloat($scope.lng));
            geocoder.geocode({'latLng': latlng}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var direcction = results[0].formatted_address;
                        // console.log(direcction);
                        $scope.curso.direction = direcction;

                        $scope.$digest();
                    } else {
                        SweetAlert.swal("Error", "No se Encontraron resultados");
                    }
                } else {
                    SweetAlert.swal("Error de Geolocalización", status);
                }
            });
        }
        $scope.CategoryCourse = [];
        $scope.TypeCourse = [];
        CategoryCourse.get({}, {}, function (data) {
            $scope.CategoryCourse = data.data;
        }, function (e) {

        });
        TypeCourse.get({}, {}, function (data) {
            $scope.TypeCourse = data.data;
        }, function (e) {

        });
        $scope.page = {title: "Curso", subtitle: "Cursos"};
        $scope.errors = [];
        $scope.saveCourse = function () {
            Course.save($scope.curso, function (data) {
                $state.go('app.cursos.addfiles', {
                    id: data.data.id
                });
            }, function (e) {
                if (parseInt(e.status) == 422) {
                    $scope.errors = e.data.errors;
                }
            });
        }
    }
);
curso.controller('view', function ($rootScope, $scope, $state, Course, $modal, toaster, $log, SweetAlert, $stateParams) {
    $scope.courses=[]
    Course.get({},{},function (data) {
        var courses=data.data;
        for (var i in courses)
            $scope.courses.push(courses[i]);
    },function (e) {

    });
});

curso.controller('CursoFiles', function ($rootScope, $scope, $state, Course, $modal, toaster, $log, SweetAlert, $stateParams, FileUploader) {
    $scope.id = ($stateParams.id);
    $scope.course = []
    Course.get({id: $scope.id}, {}, function (data) {
        $scope.course = data.data;
        $scope.initUpload($scope.course.id);
    }, function (e) {

    });



    $scope.saveCourse = function () {

        $state.go('app.cursos.view', {id: $scope.course.id});
    }
    $scope.initUpload = function (id) {
        var uploader = $scope.uploader = new FileUploader({
            url: API_SERVER + "CourseFiles/" + id,
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
            url: API_SERVER + "CourseImages/" + id,
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
curso.controller('Curso',
    function ($rootScope, $scope, $state, Course, $modal, $log, SweetAlert) {
        $scope.page = {title: "Revista", subtitle: "Cursos"};
        $scope.cursos = [];
        $scope.params = {
            limit: 10,
            page: 0,
            search: "",
            order: "name",
        };
        Course.get($scope.params, function (data) {
            $scope.cursos = data.data;
            // console.log(data.total);
        }, function (e) {


        });
        $scope.cursoactual = {};
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
                        Course.delete({id: item.id}, function (response) {
                            $scope.cursos.splice($scope.cursos.indexOf(item), 1);
                            SweetAlert.swal("Cursos !", "Eliminada", "success");
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('Cursos!', e.data.msg);
                            }

                        });
                    } else {
                        SweetAlert.swal("Cursos", "Cancelado :)", "error");
                    }
                });


        }
        $scope.open = function (item) {
            $scope.cursoactual = item;
            var modalInstance = $modal.open({
                templateUrl: 'CoursesModal.html',
                controller: 'ModalController',
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.cursoactual;
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

curso.controller('ModalController', function ($scope, $modalInstance, items, Course, toaster, SweetAlert) {
    $scope.curso = items;
    $scope.errors = [];
    $scope.ok = function () {
        Course.update({id: $scope.curso.id}, $scope.curso, function (response) {
            $scope.curso = response.data;

            $modalInstance.close($scope.curso);

            SweetAlert.swal("Cursos!", "Guardado correctamente !");
        }, function (error) {
            if (parseInt(error.status) == 422) {
                $scope.errors = error.data.errors;
                for (var i in $scope.errors)
                    toaster.error('Cursos!', $scope.errors[i][0]);
            }
        });

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})
