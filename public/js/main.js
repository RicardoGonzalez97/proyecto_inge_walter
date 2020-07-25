'use strict';
app.controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', '$auth', 'Profile', "toaster", "logout", '$http',
    function ($scope, $translate, $localStorage, $window, $auth, Profile, toaster, logout,$http) {
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
        $scope.user = {
            name: "Daniel Eduardo Pérez ",
            img: "img/a5.jpg"
        }

        var vm = this;
        vm.sele = {};
        $scope.saveCertification = function ()
        {
            $window.alert("angular");

            //return $.map(vm.sele, function(value, index){ return $window.alert("id: " + [index]);});

            //$state.go('app.certificaciones.view', {id: $scope.certification.id});
        }

        $scope.updatecertificate = function(user) {
            // console.log(user);ç

            $http.put('Pasedelista/students/' + user.id, {
                certificate:user.certificate,
            }).success(function(data, certificate, headers, config) {
                user = data;
                $scope.loading = false;
            });;
        }


        $scope.updatecertificate2 = function(user) {
            // console.log(user);

            $http.put('Pasedelista2/students/' + user.id, {
                status:user.status,
            }).success(function(data, status, headers, config) {
                user = data;
                $scope.loading = false;
            });;
        }

        $scope.updatecertificate3 = function(user) {
            // console.log(user);

            $http.put('Pasedelista3/students/' + user.id, {
                type:user.type,
            }).success(function(data, type, headers, config) {
                user = data;
                $scope.loading = false;
            });;
        }

        $scope.cambiar=function(){
            $window.alert(cambiar);
        }


        //var vm = $scope.user.id;
        //podríamos inicializar valores del modelo
        //vm.activo = false;

        $scope.avisar = function(id){
            $window.alert("id: " + id);
        }

        $scope.isLogin = function () {
            return $auth.isAuthenticated();
        };
        if (!$scope.isLogin()) {
            $auth.logout()
        } else {
            Profile.get({}, {}, function (data) {
                $scope.user = data.user
            });
        }
        $scope.isUser = function () {
            if ($scope.user) {
                if (parseInt($scope.user.user_type) == 1) return true;
                return false;
            }
            return false;
        }
        $scope.isAdmin = function () {
            if ($scope.user) {
                if (parseInt($scope.user.user_type) == 2) return true;
                return false;
            }
            return false;
        }

        $scope.isInstructor = function(){
            if($scope.user){
                if (parseInt($scope.user.user_type) == 3) return true;
                return false;
            }
            return false;
        }

        $scope.isPresidente = function(){
            if($scope.user){
                if (parseInt($scope.user.user_type) == 4) return true;
                return false;
            }
            return false;
        }

        $scope.isActive = function () {
            if($scope.students){
                if (parseInt($scope.students.certificate) === 0) return true;
                return false;
            }
        }

        
        if (!$auth.isAuthenticated()) {
            window.location = SERVER + "/#app/login/iniciar";
        }
        $scope.logout = function () {
            logout.save({}, {}, function (data) {
                toaster.pop('info', "Sesion cerrada", data.msg);
                $auth.logout();
                $scope.user = null;
                window.location = "/";
            }, function (e) {

            });

        }

        // config
        $scope.app = {
            name: 'GICDT',
            version: '2.1.0',
            author: 'Ing. Daniel Eduardo Pérez Ramírez',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: false,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        }

        // save settings to local storage
        if (angular.isDefined($localStorage.settings)) {
            $scope.app.settings = $localStorage.settings;
        } else {
            $localStorage.settings = $scope.app.settings;
        }
        $scope.$watch('app.settings', function () {
            if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                $scope.app.settings.headerFixed = true;
            }
            $localStorage.settings = $scope.app.settings;
        }, true);

        $scope.lang = {isopen: false};
        $scope.langs = {en: 'English', de_DE: 'German', it_IT: 'Italian', es: 'Spanish'};
        $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
        $scope.setLang = function (langKey, $event) {
            $scope.selectLang = $scope.langs[langKey];
            $translate.use(langKey);
            $scope.lang.isopen = !$scope.lang.isopen;
        };
        function isSmartDevice($window) {
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

    }]);