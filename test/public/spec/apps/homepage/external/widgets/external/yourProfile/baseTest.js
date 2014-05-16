define ( function( require ) {
	'use strict';

	var expect     = require( 'chai' ).expect;
	var BaseObject = require( 'apps/homepage/BaseObject');
	var base       = require( 'apps/homepage/external/widgets/external/yourProfile/base' );
	var itemView   = require( 'apps/homepage/external/widgets/external/yourProfile/views/WidgetItemView' );


	describe( '[Widgets] User Settings : base - Test ', function () {

		it( 'should be an instance of BaseObject', function () {
			expect( base ).to.be.an.instanceof( BaseObject );
		} );

		it( 'should an item view of user settings WidgetItemView', function () {
			expect( base.getExternalView ).to.be.equal( itemView );
		} );



	} );
} );
