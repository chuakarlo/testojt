define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	App.module( 'ContentNavigation.Entities', function ( Entities ) {

		Entities.SortModel = Backbone.Model.extend ( {

		} );

		Entities.SortByCollection = Backbone.Collection.extend( {
			'model' : Entities.SortModel
		} );
	} );
} );
