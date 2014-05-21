define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );
	var OnDemand = require( 'admin/data/OnDemand' );

	var List = Backbone.Collection.extend( {
		'comparator' : 'name'
	} );

	var Pages = new List( OnDemand.defaults );

	var API = {
		'getPages' : function () {

			var privileges = App.request( 'user:privileges' );

			if ( privileges.isCatalogAdmin() ) {
				Pages.add( OnDemand.CatalogTranscript );
				Pages.add( OnDemand.CatalogCreation );
			}

			return Pages;

		}
	};

	App.reqres.setHandler( 'admin:pages:on-demand', function () {
		return API.getPages();
	} );

} );
