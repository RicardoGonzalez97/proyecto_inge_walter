/**
 * Created by Daniel Perez on 05/05/2016.
 */
'use strict';

var curso = angular.module('curso', []);

curso.controller('view', function ($rootScope, $scope, $state, Course, $modal, toaster, $log, SweetAlert, $stateParams) {
    $scope.courses = [];
    $scope.inscripcion = [];
    $scope.id = ($stateParams.id);
    $scope.curse = {};

    $scope.total = 0;
    $scope.params = {
        limit: 4,
        page: 0,
        flag: false,
        current: false,
        search: "",
    };

    $scope.getCourse = function () {
        if (!$scope.params.current) {
            $scope.params.current = true;
            Course.get($scope.params, {}, function (data) {
                var courses = data.data;
                var total = parseInt(data.total);
                $scope.total = total;

                for (var i in courses)
                    $scope.courses.push(courses[i]);

                if ($scope.courses.length >= total)
                    $scope.params.flag = true;
                $scope.params.page++;
                $scope.params.current = false;
            }, function (e) {
                $scope.params.current = false;

            });
        }
    }

    $scope.getCourse();
    $scope.nextPage = function () {
        $scope.getCourse();
    }
    $scope.reloadCourse = function () {
        $scope.params.page = 0;
        $scope.params.flag = false;
        $scope.courses = [];
        $scope.getCourse();

    }
});

curso.controller('past', function ($rootScope, $scope, $state, Course, $modal, toaster, $log, SweetAlert, $stateParams) {
    $scope.courses = [];
    $scope.studentss = [];
    $scope.inscripcion = [];
    $scope.id = ($stateParams.id);
    $scope.curse = {};
    $scope.total = 0;
    $scope.params = {
        limit: 3,
        page: 0,
        flag: false,
        current: false,
        search: "",
    };

    $scope.getCourse = function () {
        if (!$scope.params.current) {
            $scope.params.current = true;
            Course.get($scope.params, {}, function (data) {
                var courses = data.data;
                var total = parseInt(data.total);
                $scope.total = total;

                for (var i in courses)
                    $scope.courses.push(courses[i]);

                if ($scope.courses.length >= total)
                    $scope.params.flag = true;
                $scope.params.page++;
                $scope.params.current = false;
            }, function (e) {
                $scope.params.current = false;

            });
        }
    }
    $scope.getCourse();
    $scope.nextPage = function () {
        $scope.getCourse();
    }
    $scope.reloadCourse = function () {
        $scope.params.page = 0;
        $scope.params.flag = false;
        $scope.courses = [];
        $scope.getCourse();

    }
});
curso.controller('Activar',function (StudentsActivate,$scope, SweetAlert, Course,Students, toaster,$stateParams) {
    $scope.id = ($stateParams.id);
    $scope.certificate = {};
    $scope.activation = {};
    $scope.courseUsers = [];
    StudentsActivate.get({
        course_id: $scope.id,
        user_id: $scope.id
    },{},function (data) {
        $scope.user_id = data.data;
        $scope.course_id = data.data;
        $scope.getCertificate($scope.id);
    },function (e) {
    });

    $scope.certificate = false;
    $scope.getCertificate = function (data) {
        StudentsActivate.get({
            course_id: $scope.id,
            user_id: $scope.id
        }, {}, function (request) {
            $scope.certificate = request.data;
            for (var i in courseUsers) {
                $scope.courseUsers.push(data[i]);
            }
        });
    }
    //Funcion para activacion de constancia
    $scope.certificate = {};
    $scope.saveCertificate = function (id) {

        SweetAlert.swal({
                title: "¿Estas seguro?",
                text: "¿Quieres activar esta constancia?",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55", confirmButtonText: "Si, Activar",
                cancelButtonText: "¡No, cancelar !",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {

                    StudentsActivate.save({
                        certificate: $scope.id
                    }, function (data) {
                        SweetAlert.swal("GRACIAS!", "¡Haz activado satisfactoriamente la constancia!", "success");
                        location.reload();
                    }, function (e) {
                        if (parseInt(e.certificate) == 444) {
                            $scope.errors = e.data.errors;
                            toastr.error('¡La constancia ya está activada!', e.data.msg);
                        }

                    });

                } else {
                    SweetAlert.swal("Activación", "Cancelada", "error");
                }
            });


    }

})

curso.controller('Inscripcion', function ($sce,StudensForCourse, NgMap, $rootScope, $scope, $state, Course, $modal, Comments, toaster, $log, SweetAlert, $stateParams) {

    $scope.id = ($stateParams.id);
    $scope.course = {};
    $scope.comments = [];
    $scope.comentario = {};
    $scope.center = "";
    $scope.courseUsuarios = 0;
    $scope.courseUsers = [];
    $scope.inscrito = 0;
    $scope.flagDate = 0;
    $scope.start_date = 0;
    $scope.imageCourse="";
    $scope.paid="";
    Course.get({id: $scope.id}, {}, function (data) {
        $scope.start_date = (data.start_date * 1000);
        $scope.course = data.data;
        $scope.center = $scope.course.lat + ',' + $scope.course.lng;
        $scope.comentario.course_id = $scope.id;
        $scope.getcoments($scope.id);
        $scope.getconstancia($scope.id);
        $scope.getStatus($scope.id);
        $scope.getDateStatus();
        $scope.imageCourse= SERVER + "" + $scope.course.image;
        $scope.paid = $sce.trustAsHtml($scope.course.paid);

    }, function (e) {

    });


    $scope.getStatus = function (id) {
        var data = {};
        StudensForCourse.get({id: id}, {}, function (request) {
            data = request.data;
            if (data != null)
                $scope.inscrito = 1;
            else
                $scope.inscrito = 0;
        });
    }

    $scope.getDateStatus = function () {
        var n = Date.now();
        if (n > $scope.start_date)
            $scope.flagDate = 1;
        else
            $scope.flagDate = 0;
    }
    $scope.sendComment = function () {

        Comments.save($scope.comentario, {}, function (request) {
            $scope.comments.push(request.data);
            $scope.comentario.comment = "";

        }, function (error) {

        });
    };
    $scope.getStudents = function (id) {
        StudensForCourse.get({course_id: id, limit: 5, page: 3}, function (request) {
            $scope.courseUsuarios = parseInt(request.total);
            var data = request.data;
            for (var i in data) {
                $scope.courseUsers.push(data[i]);
            }
        }, function (error) {
        });
    }
    $scope.constancia = false;
    $scope.getconstancia = function (id) {
        StudensForCourse.get({id: id}, {}, function (request) {
            $scope.constancia = request.data;
        });
    }
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;
    $scope.getNumber = function (num) {
        return new Array((num));
    }
    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.getSplit = function (file) {
        if (file)
            return file.split(',');

    }
    NgMap.getMap().then(function (map) {
        $scope.map = map;
        $rootScope.map = map;
    });
    $scope.params = {
        limit: 10,
        page: 0,
        cpurse_id: null,
        order: 'created_at'
    };
    $scope.getStudents($scope.id);
    $scope.getcoments = function (id) {
        $scope.params.course_id = id;
        Comments.get($scope.params, {}, function (data) {
            var coments = data.data;
            for (var i in coments) {
                $scope.comments.push(coments[i]);
            }
            $scope.params.page++;
        });
    }

    $scope.saveCertification = function () {

        SweetAlert.swal({
                title: "¿Estas seguro?",
                text: "¿Quieres inscribirte al curso?",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55", confirmButtonText: "Si, Inscribirme",
                cancelButtonText: "¡No, cancelar !",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {
                    if ($scope.courseUsuarios >= $scope.course.quota_max) {
                        SweetAlert.swal("LO SENTIMOS", "¡El curso ha rebasado el límite permitido de estudiantes!", "error");
                    } else {
                        StudensForCourse.save({course_id: $scope.id}, function (data) {
                            SweetAlert.swal("GRACIAS!", "¡Te haz inscrito satisfactoriamente al Curso!", "success");
                            location.reload();
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('¡Ya estas Inscrito!', e.data.msg);
                            }

                        });
                    }
                } else {
                    SweetAlert.swal("Inscripcion", "Cancelada", "error");
                }
            });
        //$state.go('app.certificaciones.view', {id: $scope.certification.id});
    }

    //Funcion para incripcion de estudiantes
    $scope.student = {};
    $scope.saveStudents = function (item) {

        SweetAlert.swal({
                title: "¿Estas seguro?",
                text: "¿Quieres inscribirte al curso?",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55", confirmButtonText: "Si, Inscribirme",
                cancelButtonText: "¡No, cancelar !",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {
                    if ($scope.courseUsuarios >= $scope.course.quota_max) {
                        SweetAlert.swal("LO SENTIMOS", "¡El curso ha rebasado el límite permitido de estudiantes!", "error");
                    } else {
                        StudensForCourse.save({course_id: $scope.id}, function (data) {
                            SweetAlert.swal("GRACIAS!", "¡Te haz inscrito satisfactoriamente al Curso!", "success");
                            location.reload();
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('¡Ya estas Inscrito!', e.data.msg);
                            }

                        });
                    }
                } else {
                    SweetAlert.swal("Inscripcion", "Cancelada", "error");
                }
            });


    }

})

curso.controller('CursoFiles', function ($rootScope, $scope, $state, CourseAdmin, $modal, toaster, $log, SweetAlert, $stateParams, FileUploader) {
    $scope.id = ($stateParams.id);
    $scope.course = []
    CourseAdmin.get({id: $scope.id}, {}, function (data) {
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
    function ($rootScope, $scope, $state, CourseAdmin, $modal, $log, SweetAlert) {
        $scope.page = {title: "Revista", subtitle: "Cursos"};
        $scope.cursos = [];
        $scope.params = {
            limit: 10,
            page: 0,
            search: "",
            order: "name",
        };
        CourseAdmin.get($scope.params, function (data) {
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
                        CourseAdmin.delete({id: item.id}, function (response) {
                            $scope.cursos.splice($scope.cursos.indexOf(item), 1);
                            SweetAlert.swal("Cursos !", "Eliminada", "success");
                        }, function (e) {
                            if (parseInt(e.status) == 444) {
                                $scope.errors = e.data.errors;
                                toastr.error('Cursos!', e.data.msg);
                            }

                        });
                    } else {
                        SweetAlert.swal("Cursos", "Cancelado :/", "error");
                    }
                });


        }
        $scope.open = function (item) {
            $scope.cursoactual = item;
            var modalInstance = $modal.open({
                templateUrl: 'CourseModal.html',
                controller: 'ModalControllerCourse',
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
curso.controller('AddCourse',
    function ($rootScope, $scope, $state, CourseAdmin, NgMap, CategoryCourseAdmin, TypeCourseAdmin, SweetAlert) {

        $scope.lat = 16.7531803;
        $scope.lng = -93.1127416;
        $scope.curso = {};
        $scope.curso.lat = $scope.lat;
        $scope.curso.lng = $scope.lng;
        $scope.curso.direction = "Carr. Panamericana 4106, Boulevares, 29020 Tuxtla Gutiérrez, Chis., México";
        $scope.center = "Carr. Panamericana 4106, Boulevares, 29020 Tuxtla Gutiérrez, Chis., México";
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
        CategoryCourseAdmin.get({}, {}, function (data) {
            $scope.CategoryCourse = data.data;
        }, function (e) {

        });
        TypeCourseAdmin.get({}, {}, function (data) {
            $scope.TypeCourse = data.data;
            //  $scope.TypeCourse = null.data;
        }, function (e) {

        });
        $scope.page = {title: "Revista", subtitle: "Cursos"};
        $scope.errors = [];
        $scope.saveCourse = function () {
            CourseAdmin.save($scope.curso, function (data) {
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
curso.controller('ModalControllerCourse', function ($scope, $modalInstance, items, CourseAdmin, toaster, SweetAlert) {
    $scope.curso = items;
    $scope.errors = [];
    $scope.ok = function () {
        CourseAdmin.update({id: $scope.curso.id}, $scope.curso, function (response) {
            $scope.curso = response.data;

            $modalInstance.close($scope.curso);

            SweetAlert.swal("Curso!", "Guardado correctamente !");
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
});

curso.controller('Lista', function (StudensForCourse, NgMap, $rootScope, $scope, $state, Course, $modal, Comments, toaster, $log, SweetAlert, $stateParams) {
    $scope.id = ($stateParams.id);
    $scope.course = {};
    $scope.center = "";
    $scope.courseUsuarios = 0;
    $scope.activate = {};
    $scope.courseUsers = [];
    $scope.total = 0;
    $scope.params = {
        limit: 10,
        page: 0,
        flag: false,
        current: false,
        search: "",
    };
    Course.get({id: $scope.id}, {}, function (data) {
        $scope.course = data.data;
        $scope.center = $scope.course.lat + ',' + $scope.course.lng;
    }, function (e) {
    });
    $scope.getStudents = function (id) {
        if (!$scope.params.current) {
            $scope.params.current = true;
            StudensForCourse.get({
                course_id: id,
                limit: 200 || 1,
                page: 0,
                flag: false,
                current: false,
                search: ""
            }, {}, function (request) {
                $scope.courseUsuarios = parseInt(request.total);
                var data = request.data;
                var total = parseInt(request.total);
                $scope.total = total;

                for (var i in data) {
                    $scope.courseUsers.push(data[i]);
                }
                if ($scope.courseUsers.length >= total)
                    $scope.params.flag = true;
                $scope.params.page++;
                $scope.params.current = false;
            }, function (e) {
                $scope.params.current = false;
            });
        }
    }
    $scope.getStudents($scope.id);
    $scope.nextPage = function () {
        $scope.getStudents();
    }
    $scope.reloadStudents = function (id) {
        $scope.params.page = 0;
        $scope.params.flag = false;
        $scope.StudensForCourse = [];
        $scope.getStudents($scope.id);
    }

});

curso.controller('Inscritos', function (StudensForCourse, NgMap, $rootScope, $scope, $state, Course, $modal, Comments, toaster, $log, SweetAlert, $stateParams) {
    $scope.id = ($stateParams.id);
    $scope.course = {};
    $scope.center = "";
    $scope.courseUsuarios = 0;
    $scope.courseUsers = [];
    $scope.total = 0;
    $scope.params = {
        limit: 10,
        page: 0,
        flag: false,
        current: false,
        search: "",
    };
    Course.get({id: $scope.id}, {}, function (data) {
        $scope.course = data.data;
        $scope.center = $scope.course.lat + ',' + $scope.course.lng;
    }, function (e) {
    });
    /*$scope.getStudents = function (id) {
     StudensForCourse.get({course_id: id,limit:50}, function (request) {
     $scope.courseUsuarios = parseInt(request.total);
     var data = request.data;
     for (var i in data) {
     $scope.courseUsers.push(data[i]);
     }
     $scope.params.page++;
     }, function (error) {
     });

     }
     $scope.getStudents($scope.id); */

    $scope.getStudents = function (id) {
        if (!$scope.params.current) {
            $scope.params.current = true;
            StudensForCourse.get({
                course_id: id,
                limit: 200 || 1,
                page: 0,
                flag: false,
                current: false,
                search: ""
            }, {}, function (request) {
                $scope.courseUsuarios = parseInt(request.total);
                var data = request.data;
                var total = parseInt(request.total);
                $scope.total = total;

                for (var i in data) {
                    $scope.courseUsers.push(data[i]);
                }
                if ($scope.courseUsers.length >= total)
                    $scope.params.flag = true;
                $scope.params.page++;
                $scope.params.current = false;
            }, function (e) {
                $scope.params.current = false;
            });
        }
    }
    $scope.getStudents($scope.id);
    $scope.nextPage = function () {
        $scope.getStudents();
    }
    $scope.reloadStudents = function (id) {
        $scope.params.page = 0;
        $scope.params.flag = false;
        $scope.StudensForCourse = [];
        $scope.getStudents($scope.id);
    }

});
curso.controller('Constancia', function (StudensForCourse, NgMap, $rootScope, $scope, $state, Course, $modal, Comments, toaster, $log, SweetAlert, $stateParams) {
    $scope.id = ($stateParams.id);
    $scope.course = {};
    $scope.center = "";
    $scope.courseUsuarios = 0;
    $scope.courseUsers = [];
    $scope.total = 0;
    $scope.inscrito = 0;
    $scope.flagDate = 0;
    $scope.start_date = 0;

    $scope.params = {
        limit: 10,
        page: 0,
        flag: false,
        current: false,
        search: "",
    };
    Course.get({id: $scope.id}, {}, function (data) {
        $scope.course = data.data;
        $scope.center = $scope.course.lat + ',' + $scope.course.lng;
        $scope.getconstancia($scope.id);
        $scope.getStatus($scope.id);
        $scope.getDateStatus();

    }, function (e) {
    });
    $scope.getStatus = function (id) {
        var data = {};
        StudensForCourse.get({id: id}, {}, function (request) {
            data = request.data;
            if (data != null)
                $scope.inscrito = 1;
            else
                $scope.inscrito = 0;
        });
    }

    $scope.getDateStatus = function () {
        var n = Date.now();
        if (n > $scope.start_date)
            $scope.flagDate = 1;
        else
            $scope.flagDate = 0;
    }
    $scope.constancia = false;
    $scope.getconstancia = function (id) {
        StudensForCourse.get({id: id}, {}, function (request) {
            $scope.constancia = request.data;
        });
    }
    $scope.getStudents = function (id) {
        if (!$scope.params.current) {
            $scope.params.current = true;
            StudensForCourse.get({
                course_id: id,
                limit: 200 || 1,
                page: 0,
                flag: false,
                current: false,
                search: ""
            }, {}, function (request) {
                $scope.courseUsuarios = parseInt(request.total);
                var data = request.data;
                var total = parseInt(request.total);
                $scope.total = total;

                for (var i in data) {
                    $scope.courseUsers.push(data[i]);
                }
                if ($scope.courseUsers.length >= total)
                    $scope.params.flag = true;
                $scope.params.page++;
                $scope.params.current = false;
            }, function (e) {
                $scope.params.current = false;
            });
        }
    }
    $scope.getStudents($scope.id);
    $scope.nextPage = function () {
        $scope.getStudents();
    }
    $scope.reloadStudents = function (id) {
        $scope.params.page = 0;
        $scope.params.flag = false;
        $scope.StudensForCourse = [];
        $scope.getStudents($scope.id);
    }

});
curso.controller('Createcurso', function ($rootScope, $scope, $state, Course, $modal, toaster, $log, SweetAlert, $stateParams) {
    $scope.courses = []

    $scope.inscripcion = []
    $scope.id = ($stateParams.id);
    $scope.curse = {};
    $scope.total = 0;
    $scope.params = {
        limit: 6,
        page: 0,
        flag: false,
        current: false,
        search: "",
    };
});





























