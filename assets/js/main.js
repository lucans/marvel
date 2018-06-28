// Lucas Sanches 28/06/2018
var marvel = angular.module('marvel', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider    
    .when("/characters/nameStartsWith", {
        templateUrl : "marvel/pages/home.html",
        controller: "homeCtrl",
        title: "Marvel Developer - Search"
    })  

    .when("/characters/profile/:id", {
        templateUrl : "marvel/pages/directives/marvel-character.html",
        controller: "homeCtrl",
        title: "Marvel Developer - Character"
    })       

    .otherwise({
        redirectTo: '/characters/nameStartsWith'
    });

})

.factory('apiFactory', function ($http, $location) {
    return {
        get: function(nameStartsWith){
            return $http.get("marvel/server/get.php?nameStartsWith=" + nameStartsWith + "&location=" + $location.path());
        }    
    }
})

.controller("homeCtrl", ['$scope', '$http', '$rootScope', 'apiFactory', function ($s, $http, $rs, apiFactory) {

    console.log("Cheguei : homeCtrl");  
    $s.object_result = {};

    $s.getByNameStartsWith = function(nameStartsWith){    
        if (!angular.isUndefined($s.object_result)) {
            $s.object_result.results = {};
        }
        
        $s.loading = true;    
        apiFactory.get(nameStartsWith)
        .then(function(result){                  
            $s.object_result = result.data.data;                
        })     
        .finally(function(result){          
            $s.loading = false;
        });
    }    

    $s.getCharacterById = function(){    
        if (!angular.isUndefined($s.object_result)) {
            $s.object_result.results = {};
        }

        $s.loading = true;    
        apiFactory.get()
        .then(function(result){                  
            $s.object_result = result.data.data;                
        })     
        .finally(function(result){          
            $s.loading = false;
        });
    }

}])


.directive('marvelLoading', function() {
  return {
    templateUrl: "marvel/pages/directives/marvel-loading.html"
  }
})

.directive('marvelSearchNotFound', function() {
  return {
    templateUrl: "marvel/pages/directives/marvel-search-not-found.html"
  }
})

.directive('marvelSearchCount', function() {
  return {
    templateUrl: "marvel/pages/directives/marvel-search-count.html"
  }
})
