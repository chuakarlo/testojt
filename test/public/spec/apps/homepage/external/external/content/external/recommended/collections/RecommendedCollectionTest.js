define( function ( require ) {
	'use strict';

	var expect       = require( 'chai' ).expect;

	describe ( 'RecommendedCollection Collection', function () {

		before ( function () {
			var Collection = require ( 'external/external/content/external/recommended/collections/RecommendedCollection' );
			this.collection = new Collection();
		} );

		it ( 'should be an instance of Backbone Collection', function () {
			var Backbone = require( 'backbone' );
			expect( this.collection ).to.be.an.instanceof( Backbone.Collection );
		} );

	} );
} );