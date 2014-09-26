'use strict';

var application = angular.module('trainingApp',
        [ 'ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'training.editor' ])
    .config(['$routeProvider','$locationProvider','$compileProvider','$injector',
        function ($routeProvider, $locationProvider, $compileProvider, $injector) {

        var request = new XMLHttpRequest();
        request.open("GET", "/slides", false);
        request.send(null);
        application.slides = JSON.parse(request.responseText);
        $locationProvider.html5Mode(false); // TODO

        $routeProvider
            .when('/', {templateUrl: 'partials/main.html'});
        angular.forEach(application.slides, function(route) {
            $routeProvider.when("/" + route.content, {
                templateUrl : "partials/" + route.content + ".html"
            });
        });

        // Used for the slide code samples, to dynamically add directives.
        application.compileProvider = $compileProvider;
        application.injector = $injector;

    }]);

//Get options content
var oXHR = new XMLHttpRequest(), 
    responseText= {'disableRemarks': true};

oXHR.open("GET", "/options", false);
oXHR.onreadystatechange = function (oEvent) {  
    if (oXHR.readyState === 4) {  
        if (oXHR.status === 200) {  //fine
            responseText= angular.fromJson(oXHR.responseText);
        } else {  //error
           console.log("Unable to get options from server, using default values");
        }
        application.constant('customOptions', responseText);    
    }  
};
oXHR.send(null);
