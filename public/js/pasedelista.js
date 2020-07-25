/**
 * Created by Adrian Espinosa y Jessica Rincon
 */
app.controller("PasedelistaController",function($scope,$htpp){
    $scope.updatecertificate = function(user) {
        $scope.loading = true;
        console.log(producto);
        $http.put('Pasedelista/students/' + user.id, {
            certificate:user.certificate
        }).success(function(data, certificate, headers, config) {
            user = data;
            $scope.loading = false;
        });;
    };
    $scope.init();
});