/**
 * Created by Adrian Espinosa y Jessica Rincon
 */
app.controller(" Pasedelista3Controller",function($scope,$htpp){
    $scope.updatecertificate3 = function(user) {
        $scope.loading = true;
        console.log(producto);
        $http.put('Pasedelista3/students/' + user.id, {
            type:user.type
        }).success(function(data, type, headers, config) {
            user = data;
            $scope.loading = false;
        });;
    };
    $scope.init();
});