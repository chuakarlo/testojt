define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var moment   = require( 'moment' );

	App.module( 'Entities', function ( Mod ) {

		// This collection is only used to combine link and file resources and
		// order them as expected.
		Mod.GroupCombinedResourcesCollection = Backbone.Collection.extend( {

			'comparator' : function ( m ) {
				var created = m.get( 'Created' );
				return -moment( created, 'MMM, DD YYYY HH:MM:SS' );
			}

		} );
	} );

} );
