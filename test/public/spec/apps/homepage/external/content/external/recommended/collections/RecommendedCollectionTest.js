define( function ( require ) {
	'use strict';

	var expect       = require( 'chai' ).expect;

	describe ( 'RecommendedCollection Collection', function () {

		var collection;

		before ( function () {
			var Collection = require ( 'apps/homepage/external/content/external/recommended/collections/RecommendedCollection' );
			collection = new Collection();
		} );

		it ( 'should be an instance of Backbone Collection', function () {
			var Backbone = require( 'backbone' );
			expect( collection ).to.be.an.instanceof( Backbone.Collection );
		} );

	} );
} );