define( function ( require ) {
	'use strict';

	var Marionette                = require( 'marionette' );
	var expect                    = require( 'chai' ).expect;
	var Backbone                  = require( 'backbone' );

	describe( 'ContentCompositeView CompositeView ', function () {
		before ( function () {
			var ContentCompositeView = require ( 'apps/homepage/external/content/views/ContentCompositeView' );
			var parent               = [];
			var sharedData           = {};
			require( 'apps/homepage/external/content/external/your-queue/base' ).register( parent, sharedData );

			this.compositeView       = new ContentCompositeView( { 'model' : new Backbone.Model ( parent[0] ) } );
		} );

		it ( 'should be an instance of Marionette CompositeView', function () {
			expect( this.compositeView ).to.be.an.instanceof( Marionette.CompositeView );
		} );

		it ( 'should have a template', function () {
			expect( this.compositeView.template ).to.not.equal( undefined );
		} );

		it ( 'should have a itemView', function () {
			expect( this.compositeView.itemView ).to.not.equal( undefined );
		} );

		it ( 'should have a className', function () {
			expect( this.compositeView.className ).to.not.equal( undefined );
		} );

	} );

} );