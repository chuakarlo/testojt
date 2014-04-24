define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Catalogs = Backbone.CFCollection.extend( {

			'path' : 'catalog.ClientPersonnelResourceTranscriptGateway',

			'idAttribute' : 'personnelId',

			'getReadOptions' : function () {
				return {
					'method' : 'getUsersIncompleteCatalogItems',
					'args' : {
						'personnelId' : Session.personnelId()
					}
				};
			}

		} );

	} );

	var API = {

		'getCatalogs' : function () {
			var defer = $.Deferred();

			var catalogs = new App.Entities.Catalogs();

			catalogs.fetch( {

				'success' : function () {
					defer.resolve( catalogs );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching catalogs' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'lt:catalogs', function () {
		return API.getCatalogs();
	} );

} );