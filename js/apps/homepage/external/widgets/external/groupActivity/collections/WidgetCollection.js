define ( function ( require ) {
	'use strict';

	var Backbone         = require( 'backbone' );
	var Remoting         = require( 'Remoting' );
	var Session          = require( 'Session' );
	var App              = require( 'App' );
	var ValidationSchema = {
		'title'      : 'Group Activity Validation Schema',
		'type'       : 'object',
		'required'   : [ 'Avatar', 'LicenseId', 'LicenseName' ],
		'properties' : {
			'Avatar'      : {
				'type' : 'string'
			},
			'LicenseId'   : {
				'type' : 'number'
			},
			'LicenseName' : {
				'type' : 'string'
			}
		}
	};
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
				App.Homepage.Utils.jsonVal( ValidationSchema, models[0], function ( err ) {
					if ( !err ) {
						options.success( new Collection( models[0] ) );
						return;
					}
					App.vent.trigger( 'flash:message', {
						'message' : 'Group Activity widget: JSon error'
					} );
				} );
			} ).fail( function ( error ) {
				App.vent.trigger( 'flash:message', {
					'message' : App.Homepage.Utils.message.groupActivityErrMsg
				} );
			} );
		}
	} );
} );
