define ( function (require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );

	function widgetRequest ( personnelId ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
			'method' : 'RespondGetFocusObjectiveContent',
			'args'   : {
				'personnelId' : personnelId
			}
		};
	}

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {

			var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId() ) ] );

			App.when( fetchingModels ).done( function ( models ) {

				App.Homepage.Utils.jsonVal( function ( err ) {
					if ( !err ) {
						options.success( new Backbone.Collection( models[ 0 ] ) );
					} else {
						options.error( err );
					}
				}, {
					'schema' : require( 'text!apps/homepage/external/widgets/external/focusObjective/configuration/focusObjectiveSchema.json' ),
					// 'schema' : require( 'text!apps/homepage/external/billboard/configuration/billboardSchema.json' ),
					'data'   : models[ 0 ]
				} );

			} ).fail( function ( error ) {

				App.vent.trigger( 'flash:message', {
					'message' : App.Homepage.Utils.message.focusObjectiveErrMsg
				} );

			} );
		}

	} );

} );
