define( function ( require ) {
	'use strict';

	var Model    = require( 'external/external/what-to-do-next/models/WidgetItemModel' );
	var expect   = require( 'chai' ).expect;

	describe( 'WidgetItemModel Model', function () {

		it('should be an instance of WidgetModel Model', function () {
			var model = new Model();
			expect( model ).to.be.an.instanceof( Model );
		} );

	} );

} );