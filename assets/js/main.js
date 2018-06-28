var marvel = angular.module('marvel', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider    
    .when("/home", {
        templateUrl : "marvel/pages/home.html",
        controller: "homeCtrl",
        title: "Marvel Developer"
    })       

    .otherwise({
        redirectTo: '/home'
    });

})

.factory('apiFactory', function ($http, $location) {
    return {
        get: function(nameStartsWith){
            return $http.get("marvel/server/get.php?nameStartsWith=" + nameStartsWith);
        }    
    }
})

.controller("homeCtrl", ['$scope', '$http', '$rootScope', 'apiFactory', function ($s, $http, $rs, apiFactory) {
    console.log("Cheguei : homeCtrl");

    $s.getByNameStartsWith = function(nameStartsWith){    
        $s.characters = {};
        $s.loading = true;    
        apiFactory.get(nameStartsWith)
        .then(function(result){          
            $s.characters = result.data.data.results;                
        })     
        .finally(function(result){          
            $s.loading = false;
        });
    }

}])