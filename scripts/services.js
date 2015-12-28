angular
.module('app')

.factory('exampleFactory',['$http',function($http){
    function apiCall() {
       var call = $http.get('').success(function (data) {
        });
        return 
    }
    return{
        exampleFactory:exampleFactory
    }
}]);
