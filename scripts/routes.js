angular
.module('app')

.config(['$urlRouterProvider', '$stateProvider','$locationProvider', function($urlRouterProvider, $stateProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: '../html/main.html'
        });
}]);