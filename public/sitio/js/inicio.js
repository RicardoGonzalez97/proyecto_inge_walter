'use strict';
var Inicio = angular.module('Inicio', []);

Inicio.controller('inicio', function ($scope) {
    $scope.revistas = [
        {
            url: "revista/2016.pdf",
            name: "Convocatoria 2016."
        }
    ];
    $scope.evaluators = [
        {
            nombre: "",
            abstract: "",
            cv: "",
            email: "",
            telefono: "",
            web: "",
            image: "",
        }
    ];

});

Inicio.controller('MasterController', function ($scope, $auth, logout, toaster, $state, Profile, Course) {
    $scope.logout = function () {
        logout.save({}, {}, function (data) {
            toaster.pop('info', "GICDT", data.msg);
            $auth.logout();
            $scope.user = null;
            setTimeout(function () {
                $state.go("app.inicio");
            }, 500);
        }, function (e) {

        });

    }
    $scope.courses = [];
    $scope.getCourse = function () {
        $scope.params = {
            limit: 10,
            page: 0
        };
        Course.get($scope.params, {}, function (data) {
            var datos = data.data;
            for (var i in datos)
                $scope.courses.push(datos[i]);
            // console.log($scope.courses);

            setTimeout(function () {
                $(".feature-slider").owlCarousel({
                    autoPlay: 10000,
                    items: 4,
                    itemsDesktop: [1199, 4],
                    itemsDesktopSmall: [979, 3],
                    itemsTablet: [768, 2],
                    itemsTabletSmall: [600, 1],
                    slideSpeed: 300,
                    navigation: true,
                    pagination: false,
                    navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
                });

            }, 1000);

        });
    }
    $scope.getCourse();
    $scope.isLogin = function () {
        return $auth.isAuthenticated();
    };
    if (!$scope.isLogin()) {
        $auth.logout();
        $scope.user = null;
    } else {
        Profile.get({}, {}, function (data) {
            if(data.user==null){
                $auth.logout();
                $scope.user = null;

            }
            $scope.user = data.user
        });
    }
});