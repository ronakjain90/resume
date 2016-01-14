/**
 * Created by Ivana on 9.7.2015..
 */
'use strict';

define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'bower_components/angular-resource/angular-resource',
    'jquery.migrate',
    'browser-selector',
    'jquery.easing',
    'jquery.prettyPhoto',
    'jquery.validate',
    'jquery.address',
    'jquery.isotope',
    'jquery.circliful',
    'wow',
    'jquery.circliful',
    'script'

], function (ng, couchPotato) {

    var appModule = ng.module('appModule', [
        'scs.couch-potato',
        'ui.router',
        'ngResource',
        'layoutModule',
        'homePageModule'
    ]);

    couchPotato.configureApp(appModule);

    appModule.config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                url:'/',
                views: {
                    root: {
                        templateUrl: 'interfaces/management/manageView.html'
                    }
                },
                controllerAs: 'MainController'
            })
    });

    appModule.controller('MainController', ['$scope', '$http', '$resource', '$sce', function ($scope , $http, $resource, $sce) {
        var resource = $resource('configuration.json');
        $http.defaults.headers.common['Accept']= 'application/json';

        resource.get({}).$promise.then(function(value) {
                $scope.social = value.social;
                $scope.contact = value.contact;
                $scope.about = value.about;
            });

        $scope.renderHtml = function(html_code)
        {
            return $sce.trustAsHtml(html_code);
        };

        return $scope;
    }]);

    appModule.run(function ($couchPotato, $rootScope, $state, $stateParams) {
        appModule.lazy = $couchPotato;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });


    return appModule;
});
