define( function ( require ) {
	'use strict';

	var Session = require( 'Session' );
	var async   = require( 'async' );
	var $       = require( 'jquery' );
	var _       = require( 'underscore' );
	
	var App;

	var Remoting = function () {

		// get a signature and call coldfusion with it
		var getSignature = function ( data, callback ) {

			// solves a race condition in which App is "not loaded before context _" when requiring at top of page
			App = App || require( 'App' );

			// if PD360 is available
			if( App.PD360.available() ) {
				// get the signature from PD360
				var signature = App.PD360.signature( data.method, data.args );

				// apply the signature to the request and call ColdFusion
				data.signature = signature;
				return ajax( data, callback );
			}

			if ( !data.method && typeof data.method !== 'string' ) {
				return callback( 'Missing parameter: method' );
			}

			if ( !data.args ) {
				return callback( 'Missing parameter: args' );
			}

			// params to get a signature
			var request = {
				'method'      : 'cfJsonAPIMethod1',
				'CFToken'     : Session.token(),
				'personnelId' : Session.personnelId(),
				'args' : {
					'method' : data.method,
					'args'   : data.args
				}
			};

			// when requesting a signature has completed
			var done = function ( error, signature ) {
				if ( error ) {
					return callback( error );
				}

				// apply the signature to the original request and call ColdFusion again
				data.signature = signature;
				ajax( data, callback );
			};

			// get a signature from ColdFusion
			ajax( request, done );
		};

		// executes calls to coldfusion
		var ajax = function ( request, callback ) {
			var url    = '/com/schoolimprovement/pd360/dao/CfJsonAPIService.cfc?method=';
			var method = 'cfJsonAPI';

			// if the request contains `objectPath`, update the ColdFusion method to call
			if ( request.objectPath ) {
				method = 'cfJsonObjectAPI';
			}

			// call ColdFusion
			$.ajax( {
				'url'         : url + method,
				'data'        : JSON.stringify( request ),
				'dataType'    : 'json',
				'cache'       : false,
				'processData' : false,
				'type'        : 'POST',
				'contentType' : 'application/json',

				'success' : function ( data, status, xhr ) {
					callback( null, data );
				},

				'error' : function ( xhr, status, errorThrown ) {
					callback( errorThrown );
				}
			} );

		};

		// process an individual request
		var _processRequest = function ( data, done ) {

			// if the signature has already been created
			if ( data.signature && data.signature !== '' ) {

				// immediately call ajax
				ajax( data, done );

			} else {

				// get a signature from PD360 or ColdFusion
				getSignature( data, done );

			}
		};

		// process the requests
		var processRequests = function ( requests, defer ) {

			// add request to an array, if not already an Array
			if ( requests instanceof Array === false ) {
				requests = [ requests ];
			}

			// the requests to process
			var tasks = _.map( requests, function ( request ) {
				return function ( callback ) {
					_processRequest( request, callback );
				};
			} );

			// process each request, in parallel
			async.parallel( tasks, function ( error, results ) {
				if ( error ) {
					return defer.reject( error );
				}

				defer.resolve( results );
			} );

		};

		// public API, send requests to ColdFusion
		// returns a promise that will resolve on success/failure
		this.fetch = function ( requests ) {
			var defer = $.Deferred();

			if ( !requests ) {
				return defer.reject( 'No requests to process' );
			}

			processRequests( requests, defer );

			return defer.promise();
		};

	};

	return new Remoting();
} );
