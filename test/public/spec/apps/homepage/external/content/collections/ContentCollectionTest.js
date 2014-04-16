define( function ( require ) {
	'use strict';

	var Contentmodel = require( 'apps/homepage/external/content/models/ContentModel' );
	var expect       = require( 'chai' ).expect;

	describe ( 'ContentCollectionTest Collection', function () {

		var collection;

		before ( function () {
			var Collection = require ( 'apps/homepage/external/content/collections/ContentCollection' );
			collection = new Collection();
		} );

		it ( 'should be an instance of Backbone Collection', function () {
			var Backbone = require( 'backbone' );
			expect( collection ).to.be.an.instanceof( Backbone.Collection );
		} );

		it( 'should have a model', function () {
			expect( collection.model ).to.be.equal( Contentmodel );
		} );

	} );
} );
