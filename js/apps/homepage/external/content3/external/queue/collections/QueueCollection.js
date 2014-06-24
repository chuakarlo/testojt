define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );

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
				options.success( new Backbone.Collection( models[ 0 ] ) );
			} ).fail( function ( error ) {
				App.vent.trigger( 'flash:message', {
					'message' : 'An error occurred getting queue. Please try again later.'
				} );
			} );
		}
	} );
} );
