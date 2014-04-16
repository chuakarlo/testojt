define( function ( require ) {
	'use strict';

	var Backbone   = require( 'backbone' );
	var QueueModel = require( 'apps/homepage/external/content/external/your-queue/models/QueueModel' );
	var Remoting   = require( 'Remoting' );
	var $          = require( 'jquery' );
	var Session    = require( 'Session' );

	var queueRequest =  {
		'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
		'method' : 'getContentAbbrevListByPersonnelId',
		'args'   : {
			'personnelId' : Session.personnelId()
		}
	};

	var Collection = Backbone.Collection.extend( {
		'model' : QueueModel
	} );

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {
			var fetchingModels = Remoting.fetch( [ queueRequest ] );

			$.when( fetchingModels ).done( function ( models ) {

				options.success( new Collection( models[0] ) );

			} ).fail( function ( error ) {
				// TODO: error handling
			} );
		}
	} );
} );
