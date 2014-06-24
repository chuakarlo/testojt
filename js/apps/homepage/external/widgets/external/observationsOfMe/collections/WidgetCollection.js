define ( function ( require ) {
	'use strict';

	var Backbone         = require( 'backbone' );
	var Remoting         = require( 'Remoting' );
	var $                = require( 'jquery' );
	var Session          = require( 'Session' );
	var App              = require( 'App' );
	var ValidationSchema = {
		'title'      : 'observations of me schema',
		'type'       : 'object',
		'required'   : [ 'OBSERVATIONDATE', 'NUMBEROFPRESCRIBEDPD', 'OBSERVATIONNAME', 'OBSERVATIONID' ],
		'properties' : {
			'OBSERVATIONDATE'      : {
				'type' : 'string'
			},
			'NUMBEROFPRESCRIBEDPD' : {
				'type' : 'number'
			},
			'OBSERVATIONNAME'      : {
				'type' : 'string'
			},
			'OBSERVATIONID'        : {
				'type'        : 'number',
				'uniqueItems' : true
			}
		}
	};
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
				options.success( new Collection( models[ 0 ] ) );
				App.Homepage.Utils.jsonVal( ValidationSchema, models[ 0 ], function ( err ) {
					if ( !err ) {
						options.success( new Backbone.Collection( models[ 0 ] ) );
						return;
					} else {
						App.vent.trigger( 'flash:message', {
							'message' : 'Obervations of me widget: JSon error'
						} );
					}
				} );

			} ).fail( function ( error ) {

				App.vent.trigger( 'flash:message', {
					'message' : App.Homepage.Utils.message.observationsErrMsg
				} );

			} );
		}
	} );
} );
