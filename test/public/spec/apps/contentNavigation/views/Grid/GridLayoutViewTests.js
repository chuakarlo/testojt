define( function ( require ) {

	'use strict';

	var expect		   = require( 'chai' ).expect;
	var Marionette	   = require( 'marionette' );

	var GridLayoutView = require( 'contentNavigation/views/Grid/GridLayoutView' );
	var gridLayoutView = new GridLayoutView();

	describe( 'Grid Layout View', function () {

		it( 'should be an instance of a Marionette.Layout object', function () {
			gridLayoutView.should.be.an.instanceof( Marionette.Layout );
		} );

		var _renderedContent = gridLayoutView.render().$el;

		it( 'should render the view\'s template', function () {
			expect( _renderedContent.find( '#grid-content' ).length ).to.be.above( 0 );
		} );

		it( 'should be wrapped around a <div> element', function () {
			expect( gridLayoutView.el.tagName ).to.equal( 'DIV' );
		} );

	} );
} );