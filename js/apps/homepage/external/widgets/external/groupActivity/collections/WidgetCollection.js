define ( function ( require ) {
	'use strict';

	var Backbone    = require( 'backbone' );
	var Remoting    = require( 'Remoting' );
	var Session     = require( 'Session' );
	var App         = require( 'App' );

	var message = App.Homepage.Utils.message;

	function widgetRequest ( personnelId ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
			'method' : 'getValidGroupsByPersonnelIdOrderedByRecentActivity',
			'args'   : {
				'persId' : personnelId
			}
		};
	}

	var Collection = Backbone.Collection.extend( {
		'comparator' : function ( model ) {
			var date = model.get( 'LicenseContentTypeId' );
			return -date;
		}
	} );

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {

			var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId() ) ] );

			App.when( fetchingModels ).done( function ( models ) {
				options.success( new Collection( models[ 0 ] ) );
			} ).fail( function ( error ) {
				App.vent.trigger( 'flash:message', {
					'message' : message.groupActivityErrMsg
				} );
			} );
		}
	} );
} );
