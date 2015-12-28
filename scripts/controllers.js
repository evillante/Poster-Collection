angular
.module('app')


.controller('NavigationCtrl', ['$rootScope', '$scope',
    function($rootScope, $scope){

        $scope.tab = null;
        $scope.selectTab = function(type){
            //set selected tab to scoped variable
            type == $scope.tab 
                ? $scope.tab = null 
                : $scope.tab = type
            //broadcast update to directive
            setTimeout(function(){
                $scope.$broadcast('selectTab', $scope.tab);
            }, 0);
        }

        $scope.selected = function(type){
            return $scope.tab == type ? true : false
        }
    }])

.controller('ListCtrl', ['$scope',
    function($scope){
        $scope.posters = [1,2,3,4,5,6,7,8,9,10,'lol']

        $scope.selectView = function(type){
            $scope.view = type;
        }

        $scope.view = 'grid';
        $scope.viewed = function(type){
            return $scope.view == type ? true : false
        }
    }])