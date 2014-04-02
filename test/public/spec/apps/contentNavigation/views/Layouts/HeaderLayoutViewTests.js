define( function ( require ) {

	'use strict';

	var expect		     = require( 'chai' ).expect;
	var Marionette	     = require( 'marionette' );

	var HeaderLayoutView = require( 'contentNavigation/views/Layouts/HeaderLayoutView' );
	var headerLayoutView = new HeaderLayoutView();

	describe( 'Header Layout View', function () {

		it( 'should be an instance of a Marionette.ItemView object', function () {
			headerLayoutView.should.be.an.instanceof( Marionette.ItemView );
		} );

		var _renderedContent = headerLayoutView.render().$el;

		it( 'should render ".resource-list"', function () {
			expect( _renderedContent.find( '.cn-resource-list' ).length ).to.be.above( 0 );
		} );

		it( 'should render ".cn-sortby" combobox', function () {
			expect( _renderedContent.find( '.cn-sortby' ).length ).to.be.above( 0 );
		} );

		describe( 'Sort by dropdown', function () {

			var _renderedContent = headerLayoutView.render().$el;
			var _sortBy = _renderedContent.find( '.form-control' );
			it( 'should be a dropdown menu', function () {
				expect( _sortBy.prop( 'tagName' ) ).to.equal( 'BUTTON' );
			} );
		} );

		describe( 'Dropdown menu categories', function () {
			var _renderedContent = headerLayoutView.render().$el;
			var _menu = _renderedContent.find( '.cn-sortby .dropdown-menu.cn-sortby-menu' );
			it( 'should use li element', function () {
				_menu[ 0 ].children[ 0 ].tagName.should.be.equal( 'LI' );
			} );
			it( 'should contain the "A-Z" and "Release Date" category', function () {
				_menu[ 0 ].children[ 0 ].textContent.should.be.equal( 'Release Date' );
				_menu[ 0 ].children[ 1 ].textContent.should.be.equal( 'A-Z' );
			} );

		} );

	} );

} );