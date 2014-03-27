define( function ( require ) {

	'use strict';

	var expect		     = require( 'chai' ).expect;
	var Marionette	     = require( 'marionette' );

	var FilterLayoutView = require( 'contentNavigation/views/Filters/FilterLayoutView' );
	var filterLayoutView = new FilterLayoutView();

	describe( 'Filter Layout View', function () {

		it( 'should be an instance of a Marionette.ItemView object', function () {
			filterLayoutView.should.be.an.instanceof( Marionette.ItemView );
		} );

		var _renderedContent = filterLayoutView.render().$el;

		it( 'should render the view\'s template', function () {
			expect( _renderedContent.find( '.cn-filter' ).length ).to.be.above( 0 );
		} );

		it( 'should be wrapped around a <div> element', function () {
			expect( filterLayoutView.el.tagName ).to.equal( 'DIV' );
		} );
	} );

} );