define ( function (require ) {
	'use strict';

	var Backbone         = require( 'backbone' );
	var Remoting         = require( 'Remoting' );
	var Session          = require( 'Session' );
	var App              = require( 'App' );

	function widgetRequest ( personnelId ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.process.ProcessGateway',
			'method' : 'getExtByEducatorForLearningTargets',
			'args'   : {
				'educId' : personnelId
			}
		};
	}

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {

			var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId() ) ] );

			App.when( fetchingModels ).done( function ( models ) {
				App.Homepage.Utils.jsonVal( function ( err ) {
					if ( !err ) {
						options.success( new Backbone.Collection( models[ 0 ].slice( 0,5 ) ) );
						return;
					}else {
						App.vent.trigger( 'flash:message', {
							'message' : 'Process of Me Widget: ' + err.message
						} );
					}
				}, {
					'schema' : require( 'text!apps/homepage/external/widgets/external/processOfMe/configuration/processSchema.json' ),
					'data'   : models[ 0 ].slice( 0,5 )
				} );
			} ).fail( function ( error ) {
				App.vent.trigger( 'flash:message', {
					'message' : App.Homepage.Utils.message.processOfMeErrMsg
				} );
			} );
		}

	} );
} );
