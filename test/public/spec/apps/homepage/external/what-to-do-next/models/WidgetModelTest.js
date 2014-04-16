define( function ( require ) {
	'use strict';

	var Model    = require( 'apps/homepage/external/what-to-do-next/models/WidgetModel' );
	var expect   = require( 'chai' ).expect;

	describe( 'WidgetModel Model', function () {

		it('should be an instance of WidgetModel Model', function () {
			var model = new Model();
			expect( model ).to.be.an.instanceof( Model );

		} );

	} );

} );