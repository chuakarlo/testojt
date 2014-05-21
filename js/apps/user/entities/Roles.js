define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var $          = require( 'jquery' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Role = Backbone.CFModel.extend( {

			'idAttribute' : 'EducatorType'

		} );

		Entities.Roles = Backbone.CFCollection.extend( {

			'model' : Entities.License,

			'path' : 'core.EducatorTypeVVGateway',

			'getReadOptions' : function () {
				return {
					'method' : 'getAll',
					'args'   : {
						'id' : ''
					}
				};
			}

		} );

		var Controller = Marionette.Controller.extend( {

			'getRoles' : function () {
				var defer = $.Deferred();

				var roles = new App.Entities.Roles();

				roles.fetch( {

					'success' : function () {
						defer.resolve( roles );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching Roles' ) );
					}

				} );

				return defer.promise();
			}

		} );

		var API = new Controller();

		App.reqres.setHandler( 'user:roles', function () {
			return API.getRoles();
		} );

	} );

} );
