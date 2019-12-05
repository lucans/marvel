// Lucas Sanches 28/06/2018
var marvel = angular.module('marvel', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider    
    .when("/characters/search", {
        templateUrl : "marvel/pages/home.html",
        controller: "homeCtrl",
        title: "Marvel Developer - Search"
    })  

    .when("/characters/profile/:id", {
        templateUrl : "marvel/pages/directives/marvel-character.html",
        controller: "homeCtrl",
        title: "Marvel Developer - Character"
    })       

    .when("/comics/:id", {
        templateUrl : "marvel/pages/directives/marvel-comic.html",
        controller: "homeCtrl",
        title: "Marvel Developer - Comic"
    })   

    .otherwise({
        redirectTo: '/characters/search'
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

    $s.getByRoute = function(){    
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

    // $s.getComicById = function(){    
    //     if (!angular.isUndefined($s.object_result)) {
    //         $s.object_result.results = {};
    //     }

    //     $s.loading = true;    
    //     apiFactory.get()
    //     .then(function(result){                  
    //         $s.object_result = result.data.data;                
    //     })     
    //     .finally(function(result){          
    //         $s.loading = false;
    //     });
    // }

    $s.stripCode = function(link){
        var a = link.split("/");
        return a[a.length - 1];
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

.directive('marvelCharacterSingle', function() {
  return {
    link: function (scope, elem, attrs) {
        scope.details = attrs.details;
    },
    templateUrl: function(teste){
        return "marvel/pages/directives/marvel-character-single.html"
    }
  
  }
})