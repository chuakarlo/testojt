define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Schools = Backbone.Collection.extend( {

			'url' : function () {
				return '/com/schoolimprovement/pd360/dao/RespondService.cfc?method=RespondGetSchoolsUnderDistrict&ncesDistId=' + this.id;
			},

			'parse' : function ( response, options ) {

				var obj = [{ 'value' : '', 'label' : 'Choose a school...'}];

				_.each( response, function ( value ) {
					obj.push( {
						'value' : value.ID,
						'label' : value.SchoolName
					} );
				} );

				obj.push( { 'value' : '455134', 'label' : 'OTHER SCHOOL' } );

				return obj;
			},

			'initialize' : function ( options ) {
				this.id = options.id;
			}

		} );

		var API = {

			'getSchools' : function ( id ) {
				var defer = $.Deferred();

				var schools = new Entities.Schools( { 'id' : id } );

				schools.fetch( {

					'success' : function () {
						defer.resolve( schools );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching schools' ) );
					}

				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'common:schools', function ( id ) {
			return API.getSchools( id );
		} );

	} );

} );
