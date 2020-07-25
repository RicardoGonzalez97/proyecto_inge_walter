
var Recuperar = angular.module('Recuperar', []);

Recuperar.controller('recovery', function ($scope, toaster, $auth, $location, RecoveryPassword,$state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.isCollapsed=false;
    $scope.resetPassword = function () {
        RecoveryPassword.save($scope.user, {}, function (request) {
            var msg = request.message;
            toaster.pop('success', "Información", msg);
            $scope.isCollapsed=true;
            setTimeout(function () {
                $state.go("app.login.iniciar");
            },500);
        }, function (error) {
            var e = error.data.message;
            toaster.pop('error', "Error", e);

        });
    }
});