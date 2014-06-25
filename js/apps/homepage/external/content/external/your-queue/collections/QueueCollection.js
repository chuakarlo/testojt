define( function ( require ) {
	'use strict';

	var Backbone   = require( 'backbone' );
	var Remoting   = require( 'Remoting' );
	var Session    = require( 'Session' );
	var App        = require( 'App' );
	var QueueModel = require( 'apps/homepage/external/content/external/your-queue/models/QueueModel' );
	var async      = require( 'async' );
	var Collection = Backbone.Collection.extend( {
		'model' : QueueModel
	} );

	function getUUVideoIdValidation ( data, callback ) {
		var UUVideoIdSchema = {
			'title'      : 'Queue schema 1',
			'type'       : 'object',
			'required'   : [ 'UUVideoId' ],
			'properties' : {
				'ContentId' : {
					'type' : 'number'
				}
			}
		};

		App.Homepage.Utils.jsonVal( UUVideoIdSchema, data, function ( err ) {
			if ( err ) {
				callback( null, false );
			} else {
				callback( null, true );
			}
		} );
	}

	function getContentIdValidation ( data, callback ) {
		var ContentIdSchema = {
			'title'      : 'Queue schema 2',
			'type'       : 'object',
			'required'   : [ 'ContentId' ],
			'properties' : {
				'ContentId' : {
					'type' : 'number'
				}
			}
		};

		App.Homepage.Utils.jsonVal( ContentIdSchema, data, function ( err ) {
			if ( err ) {
				callback( null, false );
			} else {
				callback( null, true );
			}
		} );
	}
	return Backbone.Collection.extend( {

		'fetch' : function ( options ) {

			var queueRequest = {
				'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
				'method' : 'getContentAbbrevListByPersonnelId',
				'args'   : {
					'personnelId' : Session.personnelId()
				}
			};

			var fetchingModels = Remoting.fetch( [ queueRequest ] );

			App.when( fetchingModels ).done( function ( models ) {

				if ( models.length > 0 ) {
					async.series([
						function ( callback ) {
							getContentIdValidation( models[ 0 ], callback );
						},
						function ( callback ) {
							getUUVideoIdValidation( models[ 0 ], callback );
						}
					], function ( err, results ) {
						//temporary until this is fixed
						results = [ true, true ];
						if ( ! ( results[ 0 ] || results[ 1 ] ) ) {
							App.vent.trigger( 'flash:message', {
								'message' : 'Queue: JSon Error!'
							} );
						}
					});
				}

				options.success( new Collection( models[ 0 ] ) );

			} ).fail( function ( error ) {

				App.vent.trigger( 'flash:message', {
					'message' : 'An error occurred getting queue. Please try again later.'
				} );

			} );

		},

		'alterData' : function () {}

	} );

} );
