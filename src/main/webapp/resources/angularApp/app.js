
define(['require'], function(require) {

	'use strict';

	var dmsApp = angular.module('dmsApp', [
		'ui.router',
		'ngFileUpload',
		'ngSanitize',
		'angularModalService',
		'commonFilterModule',
		'commonDirectiveModule',
		'documentFactoryModule',
		'newsFactoryModule'
	])

		.config(['$httpProvider', '$locationProvider',
			function($httpProvider, $locationProvider) {
				//initialize get if not there
				if (!$httpProvider.defaults.headers.get) {
					$httpProvider.defaults.headers.get = {};
				}

				// Answer edited to include suggestions from comments
				// because previous version of code introduced browser-related errors

				//disable IE ajax request caching
				$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
				// extra
				$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
				$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
			}])

	/**.run(function ($rootScope, $timeout, appMainFactory, $state, $window, $location){
		
		$window.onunload = function (){
			$window.location.href = '';
		};
		$rootScope.showTicker = false;
		
		$rootScope.appRun = true;
		$rootScope.$on('$stateChangeSuccess', function (evt, to, params){
			
			$timeout(function (){
				var maxHeight = $(document).height() - $(window).height();
				if(maxHeight == 0){
					$(".ticker").css("bottom","50px");
				}else{
					$(".ticker").css("bottom","0px");
				}
			},1000);
		});
	    
		$rootScope.userData = {
			username:null,
			roles:null,
			group:null
		};
		
		appMainFactory.getUserData()
			.then(function successCallback(response) {
				var userData = response.data.userData;
				$rootScope.userData.username = userData.username.replace(/["']/g,"");
				$rootScope.userData.roles = userData.roles.replace(/["']/g,"").replace(/["']/g,"").split(",");
				$rootScope.userData.group = userData.group.replace(/[[\]]/g,"");
				
			}, function errorCallback(response) {
				console.log(response.data);
			});
	    
		$rootScope.btnShowNews = function (){
			$('.ticker').slideDown();
		};
	})**/

	/**.controller('navigationController',function ($rootScope,$scope,$location,$timeout,appMainFactory){
		$rootScope.displayNavigation = true;
		$rootScope.navigationData = [];
		appMainFactory.getNavigationData()
			.then(function successCallback(response) {
				$rootScope.navigationData = response.data.navigationData;
				$rootScope.displayNavigation = true;
			}, function errorCallback(response) {
			});

		$scope.showDisplayNavigation = function (){
			if($rootScope.displayNavigation){
				return true;
			}
		}
		
		
		$scope.listRoleUser = [];
		appMainFactory.getUserRole()
		.then(function successCallback(response) {
			$rootScope.listRoleUser = response.data.listUserRole;
		}, function errorCallback(response) {
		})
	})**/

	/**.directive('navigation',function() {
		return {
			link: function(scope, element, attrs) {
				$(element[0]).removeClass("invisible");
			}
		}
	})**/

	/**.factory('appMainFactory',function ($http){
		return {
			getUserData: function () {
				return $http({
					method: 'GET',
					url: 'main/getUserData'
				});
			},
			getNavigationData: function () {
				return $http({
					method: 'GET',
					url: 'main/getNavigationData'
				});
			},
			getUserRole: function () {
				return $http({
					method: 'GET',
					url: 'main/getUserRole'
				});
			}
		}
	});**/

	return dmsApp;
});