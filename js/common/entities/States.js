define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );

	App.module( 'Entities', function ( Entities ) {

		Entities.States = Backbone.Collection.extend( {

			'url' : function () {
				return '/com/schoolimprovement/pd360/dao/RespondService.cfc?method=respondGetStatesOmitQA';
			},

			'parse' : function ( response, options ) {

				var obj = [{ 'value' : '', 'label' : 'Choose a state...' }];

				_.each( response, function ( value ) {
					// Ignore AA
					if ( value !== 'AA' ) {
						obj.push( {
							'value' : value,
							'label' : value
						} );
					}
				} );

				obj.push( { 'value' : 'AA', 'label' : 'OTHER STATE' } );

				return obj;
			}

		} );

		var API = {

			'getStates' : function () {
				var defer = $.Deferred();

				var states = new Entities.States();

				states.fetch( {

					'success' : function ( collection, response, options ) {
						defer.resolve( collection );
					},

					'error' : function ( collection, response, options ) {
						defer.reject( new Error( 'Error fetching states' ) );
					}

				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'common:states', function () {
			return API.getStates();
		} );

	} );

} );
