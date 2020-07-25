/**
 * Created by Daniel Perez on 23/05/2016.
 */
var Acceso = angular.module('Acceso', []);
/**
 * Iniciar sesion
 *
 */
Acceso.controller('recoveryPassword', function ($scope, $auth, toaster, $state, $stateParams, UserToken, RestorePassword) {
    var token_ = ($stateParams.token);
    $scope.user = {};
    UserToken.save({token: token_}, {}, function (request) {
        // console.log(request);
        $scope.user = request.user;
    }, function (error) {
        var e = error.data.message;
        toaster.pop('error', "Error", e);

    });
    $scope.Recovery = function () {
        RestorePassword.save({
            email: $scope.user.email,
            token: token_,
            password: $scope.password,
            password_confirmation: $scope.password_confirmation
        }, {}, function (request) {
            toaster.pop('success', 'Información!', request.message);
            setTimeout(function () {
                $state.go('app.login.iniciar');
            }, 1000);
        }, function (error) {
            var e = error.data.errors;
            for (var i in e)
                toaster.pop('error', 'Error!', e[i][0]);
        });
    }
});
Acceso.controller('login', function ($scope, $auth, toaster, $state) {
    $scope.iniciars = [
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

    $scope.user = {};
    $scope.authError = null;
    if ($auth.isAuthenticated()) {

        toaster.pop('sucess', 'Acceso Satisfactorio', 'Bienvenido');
        setTimeout(function () {
            window.location = SERVER + "app#/app/cursos/view";
        }, 500);

    }
    $scope.login = function () {
        $scope.authError = null;
        $auth.login({email: $scope.user.email, password: $scope.user.password})
            .then(function () {
                toaster.pop('sucess', 'Acceso Satisfactorio', 'Bienvenido');
                setTimeout(function () {
                    window.location = SERVER + "app#/app/cursos/view";
                }, 500);
            }).catch(function (response) {
            $scope.authError = response.data ? response.data.message : response;
            toaster.pop('error', 'Error!', response.data ? response.data.message : response);
        });
    };
    $scope.sending = false;
    $scope.isCollapsed = true;
    $scope.resetPassword = function () {

    }
    $scope.authenticate = function (provider) {
        $auth.authenticate(provider)
            .then(function () {
                toaster.pop('info', 'Acceso Satisfactorio', 'Bienvenido');
                window.location = SERVER + "app/cursos/view";
            })
            .catch(function (response) {
                if (response.status == 406) {
                    $scope.authError = response.data ? response.data.msg : response;
                    toaster.pop('error', 'Error!', response.data.msg);
                    $state.go("app.login.registro");

                }
            });
    };

});

Acceso.controller('Registro', function ($scope, toaster, $auth, $location, Sessions) {

    $scope.user = {};
    $scope.errors = [];
    $scope.today = function () {
        $scope.dt = new Date();
    };

    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    $scope.birthdate = "";

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        class: 'datepicker',
        showWeeks: false
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MM-yyyy', 'yyyy-MM-dd', 'dd/MM/yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

    $scope.register = function () {
        $scope.user.birthdate = $('#fec_nac').val();
        console.log($scope.user);

        $auth.signup($scope.user)
            .then(function (response) {
                $auth.setToken(response);
                window.location = SERVER + "";
                toaster.info('Haz creado una nueva cuenta, para completar tu registro  deberas activar tu cuenta se te envió una notificación a tu correo electrónico');
            })
            .catch(function (response) {
                if (response.status == 422) {

                    $scope.errors = [];
                    var data = response.data.errors;
                    for (var i in data) {
                        toaster.pop("error", "Error", data[i][0]);
                        // console.log(i);
                        $scope.errors.push(data[i]);
                    }
                }
            });
    }
    Sessions.save({}, {}, function (data) {
        var data = data.session;
        $scope.user.email = data.email;
        $scope.user.name = data.first_name;
        $scope.user.ap_pat = data.last_name;
        $scope.user.ap_mat = data.last_name;
        $scope.user.birthdate = data.date_birth;
        $scope.user.facebook = data.facebook;
        $scope.user.twitter = data.twitter
        $scope.user.google = data.google;
        $scope.user.photo = data.photo;
        $scope.user.gender = data.gender;
        $scope.user.nickname = data.screen_name;

    }, function (e) {

    });
});