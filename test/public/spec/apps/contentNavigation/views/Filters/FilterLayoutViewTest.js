define( function ( require ) {

	'use strict';

	var expect		     = require( 'chai' ).expect;
	var Marionette	     = require( 'marionette' );

	var FilterLayoutView = require( 'contentNavigation/views/Filters/FilterLayoutView' );

	describe( 'FilterLayout View', function () {

		var filterLayoutView;
		var _renderedContent;

		before( function () {
			filterLayoutView = new FilterLayoutView();
			_renderedContent = filterLayoutView.render().$el;
		} );

		after( function () {
			filterLayoutView = undefined;
			_renderedContent = undefined;
		} );

		it( 'should be an instance of a Marionette.ItemView object', function () {
			filterLayoutView.should.be.an.instanceof( Marionette.ItemView );
		} );

		it( 'should have "template" ', function () {
			filterLayoutView.should.have.property( 'template' );
		} );

		it( 'should render the view\'s template', function () {
			expect( _renderedContent.find( '.cn-filter' ).length ).to.be.above( 0 );
		} );

		it( 'should be wrapped around a <div> element', function () {
			expect( filterLayoutView.el.tagName ).to.equal( 'DIV' );
		} );
	} );

} );