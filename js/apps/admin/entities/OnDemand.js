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
			var defer = App.Deferred();

			var fetchingPrivileges = App.request( 'user:privileges' );

			App.when( fetchingPrivileges ).done( function ( privileges ) {
				if ( privileges.isCatalogAdmin() ) {
					Pages.add( OnDemand.CatalogTranscript );
					Pages.add( OnDemand.CatalogCreation );
				}

				defer.resolve( Pages );
			} ).fail( App.errorHandler );

			return defer.promise();
		}
	};

	App.reqres.setHandler( 'admin:pages:on-demand', function () {
		return API.getPages();
	} );

} );
