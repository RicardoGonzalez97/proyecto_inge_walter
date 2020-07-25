/**
 * Created by Adrian Espinosa y Jessica Rincon
 */
app.controller(" Pasedelista2Controller",function($scope,$htpp){
    $scope.updatecertificate2 = function(user) {
        $scope.loading = true;
        console.log(producto);
        $http.put('Pasedelista2/students/' + user.id, {
            status:user.status
        }).success(function(data, status, headers, config) {
            user = data;
            $scope.loading = false;

        });;
    };
    $scope.init();
});