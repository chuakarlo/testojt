define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Observations = Backbone.CFCollection.extend( {

			'path' : 'ObservationService',

			'idAttribute' : 'targetId',

			'getReadOptions' : function () {
				return {
					'method' : 'getObservationsByTargetIdWithPrescribedPDCount',
					'args'   : {
						'targetId' : Session.personnelId()
					}
				};
			}

		} );

	} );

	var API = {

		'getObservations' : function () {
			var defer = $.Deferred();

			var observations = new App.Entities.Observations();

			observations.fetch( {

				'success' : function () {
					defer.resolve( observations );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching observations' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'lt:observations', function () {
		return API.getObservations();
	} );

} );
