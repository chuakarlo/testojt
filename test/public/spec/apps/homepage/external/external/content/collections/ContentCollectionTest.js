define( function ( require ) {
	'use strict';

	var Contentmodel = require( 'external/external/content/models/ContentModel' );
	var expect       = require( 'chai' ).expect;

	describe ( 'ContentCollectionTest Collection', function () {

		before ( function () {
			var Collection = require ( 'external/external/content/collections/ContentCollection' );
			this.collection = new Collection();
		} );

		it ( 'should be an instance of Backbone Collection', function () {
			var Backbone = require( 'backbone' );
			expect( this.collection ).to.be.an.instanceof( Backbone.Collection );
		} );

		it( 'should have a model', function () {
			expect( this.collection.model ).to.be.equal( Contentmodel );
		} );

	} );
} );
