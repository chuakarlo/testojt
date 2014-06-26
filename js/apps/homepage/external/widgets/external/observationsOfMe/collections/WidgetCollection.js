define ( function ( require ) {
	'use strict';

	var Backbone         = require( 'backbone' );
	var Remoting         = require( 'Remoting' );
	var $                = require( 'jquery' );
	var Session          = require( 'Session' );
	var App              = require( 'App' );

	function widgetRequest ( personnelId ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.ObservationService',
			'method' : 'getObservationsByTargetIdWithPrescribedPDCount',
			'args'   : {
				'targetId' : personnelId
			}
		};
	}

	var Collection = Backbone.Collection.extend( {
		'comparator' : function ( model ) {
			return App.Homepage.Utils.compareDate( model, 'ObservationDate' );
		}
	} );

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {

			var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId() ) ] );

			$.when( fetchingModels ).done( function ( models ) {
				App.Homepage.Utils.jsonVal( function ( err ) {
					if ( !err ) {
						options.success( new Collection( models[ 0 ] ) );
						return;
					} else {
						App.vent.trigger( 'flash:message', {
							'message' : 'Obervations of me widget: JSon error'
						} );
					}
				}, {
					'schema' : require( 'text!apps/homepage/external/widgets/external/observationsOfMe/configuration/observationsOfMeSchema.json' ),
					'data'   : models [ 0 ]
				} );

			} ).fail( function ( error ) {

				App.vent.trigger( 'flash:message', {
					'message' : App.Homepage.Utils.message.observationsErrMsg
				} );

			} );
		}
	} );
} );
