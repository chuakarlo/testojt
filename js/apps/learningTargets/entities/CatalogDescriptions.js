define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.CatalogDescriptions = Backbone.CFCollection.extend( {

			'path' : 'CatalogService',

			'idAttribute' : 'catalogId',

			'getReadOptions' : function () {
				var catalogId             = this.catalogId;
				var catalogResourceId     = this.catalogResourceId;
				var catalogResourceTypeId = this.catalogResourceTypeId;
				return {
					'method' : 'getResourceDetailsByCatalogIdAndCatalogResourceIdAndCatalogResourceTypeId',

					'args' : {
						'catalogId'             : catalogId,
						'catalogResourceId'     : catalogResourceId,
						'catalogResourceTypeId' : catalogResourceTypeId
					}
				};
			}

		} );

	} );

	var API = {

		'getCatalogDescription' : function ( model ) {
			var defer = $.Deferred();

			var catalogDescription                   = new App.Entities.CatalogDescriptions();
			catalogDescription.catalogId             = model.get( 'CatalogId' );
			catalogDescription.catalogResourceId     = model.get( 'CatalogResourceId' );
			catalogDescription.catalogResourceTypeId = model.get( 'CatalogResourceTypeId' );

			catalogDescription.fetch( {

				'success' : function () {
					defer.resolve( catalogDescription );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching catalog description' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'lt:description', function ( model ) {
		return API.getCatalogDescription( model );
	} );

} );
