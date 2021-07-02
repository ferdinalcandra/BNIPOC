
require.config({
	// alias libraries paths
	waitSeconds: 200,
	urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'angular': '../assets/node_modules/angular/angular.min',
        'uirouter':'../assets/node_modules/angular-ui-router/release/angular-ui-router.min',
        'modalService':'../assets/node_modules/angular-modal-service/src/angular-modal-service',
        'ngFileUploadShim':'../assets/node_modules/ng-file-upload/dist/ng-file-upload-shim.min',
        'ngFileUpload':'../assets/node_modules/ng-file-upload/dist/ng-file-upload.min',
        'ngSanitize':'../assets/node_modules/angular-sanitize/angular-sanitize.min'
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
    	'angular': {
            exports: 'angular'
        },
    	'uirouter': {
            deps: ['angular']
        },
        'modalService':{
        	deps: ['angular']
        },
        'ngFileUploadShim':{
        	deps: ['angular']
        },
        'ngFileUpload':{
        	deps: ['angular']
        },
        'ngSanitize':{
        	deps: ['angular']
        },
        'app': {
            deps:['uirouter', 'modalService', 'ngFileUploadShim', 'ngFileUpload', 'ngSanitize']
        }
    },

    // kick start application
    deps: ['app'],
    onNodeCreated: function(node, config, moduleName, url) {
    	
    }
});

require([
	'app',
	'routes',
	'./directive/common.directive',
	'./filter/common.filter',
	'./controller/dms/document',
	'./factory/dms/document',
	'./controller/dms/news',
	'./factory/dms/news'
	],
	function () {
		angular.bootstrap(document, ['dmsApp']);
});