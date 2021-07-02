define(['app'], function(dmsApp) {

	dmsApp.config(['$httpProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
		function($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
			//ANGULAR ROUTE
			$locationProvider.hashPrefix('');
			$urlRouterProvider.otherwise('/document');
			$stateProvider
				.state('document', {
					url: 'dms/document',
					templateUrl: 'dms/document',
					controller: 'documentController'
				})
		}])
		
		

});