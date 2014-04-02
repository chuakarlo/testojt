define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Personnel = Backbone.CFModel.extend( {

			'path' : 'core.ClientPersonnelGateway',

			'idAttribute' : 'PersonnelId',

			'getReadOptions' : function () {
				return {
					'method' : 'getById',
					'args' : {
						'id' : Session.personnelId()
					}
				};
			},

			'getUpdateOptions' : function () {
				return {
					'method'     : 'update',
					'objectPath' : 'core.ClientPersonnel',
					'args'       : this.toJSON()
				};
			}

		} );

		var API = {

			'getPersonnel' : function () {
				var defer = $.Deferred();

				var personnel = new Entities.Personnel();

				personnel.fetch( {

					'success' : function () {
						defer.resolve( personnel );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching personnel' ) );
					}

				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'user:personnel', function () {
			return API.getPersonnel();
		} );

	} );

} );
