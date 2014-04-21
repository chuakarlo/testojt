define ( function ( requir ) {
	'use strict';

	var base                   = require( 'external/external/what-to-do-next/external/your-profile/base' );
	var expect                 = require( 'chai' ).expect;
	var BaseObj                = require( 'external/BaseObject' );
	var WidgetItemView         = require( 'external/external/what-to-do-next/external/your-profile/views/WidgetItemView' );
	var InactiveWidgetItemView = require( 'external/external/what-to-do-next/external/your-profile/views/InactiveWidgetItemView' );


	describe( 'baseTest for Your Profile', function () {

		it( 'should be an instance of BaseObject', function () {
			expect( base ).to.be.an.instanceof( BaseObj );
		} );

		it( 'getExternalView should return WidgetItemView ', function () {
			var view = base.getExternalView;
			expect( view ).to.be.equal( WidgetItemView );
		} );

		it( 'getTemplate should return InactiveWidgetItemView ', function () {
			var view = base.getTemplate;
			expect( view ).to.be.equal( InactiveWidgetItemView );
		} );

		it( 'should have an ID ', function () {
			expect( base._id ).to.not.be.equal( undefined );
		} );

		it( 'should have a Header ', function () {
			expect( base._header ).to.not.be.equal( undefined );
		} );

		it( 'should have a Footer ', function () {
			expect( base._footer ).to.not.be.equal( undefined );
		} );

		it( 'should have a collection', function () {
			expect ( base._items ).to.be.not.equal( undefined );
		} );

	} );
} );