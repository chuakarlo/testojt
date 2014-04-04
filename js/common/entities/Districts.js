define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Districts = Backbone.Collection.extend( {

			'url' : function () {
				return '/com/schoolimprovement/pd360/dao/RespondService.cfc?method=RespondGetDistrictsUnderState&state=' + this.id;
			},

			'parse' : function ( response, options ) {

				var obj = [{ 'value' : '', 'label' : 'Choose a district...' }];

				_.each( response, function ( value ) {
					obj.push( {
						'value' : value.NCESDistrictID,
						'label' : value.District
					} );
				} );

				obj.push( { 'value' : '360-452716', 'label' : 'OTHER DISTRICT' } );

				return obj;
			},

			'initialize' : function ( options ) {
				this.id = options.id;
			}

		} );

		var API = {

			'getDistricts' : function ( id ) {
				var defer = $.Deferred();

				var districts = new Entities.Districts( { 'id' : id } );

				districts.fetch( {

					'success' : function () {
						defer.resolve( districts );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching districts' ) );
					}

				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'common:districts', function ( id ) {
			return API.getDistricts( id );
		} );

	} );

} );
