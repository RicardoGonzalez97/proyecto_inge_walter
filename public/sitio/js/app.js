/**
 * Created by T4B on 5/21/16.
 */
'use strict';

var app = angular.module('manu', [
    'ngResource',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'satellizer',
    'toaster',
]).directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});
app.config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide','$authProvider',
        function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide,$authProvider) {

            // lazy controller, directive and service
            app.controller = $controllerProvider.register;
            app.directive  = $compileProvider.directive;
            app.filter     = $filterProvider.register;
            app.factory    = $provide.factory;
            app.service    = $provide.service;
            app.constant   = $provide.constant;
            app.value      = $provide.value;

            $authProvider.tokenRoot = null;
            $authProvider.baseUrl = '/';
            $authProvider.loginUrl = '/auth/login';
            $authProvider.signupUrl = '/auth/signup';
            $authProvider.unlinkUrl = '/auth/unlink/';
            $authProvider.tokenName = 'token';

            $authProvider.facebook({
                name: 'facebook',
                url: '/auth/facebook',
                authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                redirectUri: SERVER,
                requiredUrlParams: ['display', 'scope'],
                scope: ['email'],
                scopeDelimiter: ',',
                display: 'popup',
                type: '2.0',
                clientId:"525982820914900",
                popupOptions: { width: 580, height: 400 }
            });

            $authProvider.google({
                url: '/auth/google',
                authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                redirectUri: SERVER,
                requiredUrlParams: ['scope'],
                optionalUrlParams: ['display'],
                scope: ['profile', 'email'],
                scopePrefix: 'openid',
                clientId:"643088019460-675sjt4c5kgs1el4tartjonolk6uh4p0.apps.googleusercontent.com",
                scopeDelimiter: ' ',
                display: 'popup',
                type: '2.0',
                popupOptions: { width: 452, height: 633 }
            });

// LinkedIn
            $authProvider.linkedin({
                url: '/auth/linkedin',
                authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
                redirectUri: SERVER,
                requiredUrlParams: ['state'],
                scope: ['r_emailaddress'],
                clientId:"78m8t5c8p8dnsf",
                scopeDelimiter: ' ',
                state: 'STATE',
                type: '2.0',
                popupOptions: { width: 527, height: 582 }
            });

// Twitter
            $authProvider.twitter({
                url: '/auth/twitter',
                authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
                redirectUri: window.location.origin,
                type: '1.0',
                popupOptions: { width: 495, height: 645 }
            });




        }
    ])

app.run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
);