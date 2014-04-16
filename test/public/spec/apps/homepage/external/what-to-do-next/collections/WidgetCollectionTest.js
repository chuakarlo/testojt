define( function ( require ) {
	'use strict';

	var Collection  = require( 'apps/homepage/external/what-to-do-next/collections/WidgetCollection' );
	var WidgetModel = require( 'apps/homepage/external/what-to-do-next/models/WidgetModel' );
	var expect      = require( 'chai' ).expect;

	describe( 'WidgetCollection Collection', function () {

		before ( function () {
			this.collection = new Collection();
		} );

		it( 'should be an instance of WidgetCollection Collection', function () {
			expect( this.collection ).to.be.an.instanceof( Collection );
		} );

		it( 'should have a model of WidgetModel instance', function () {
			var model = new this.collection.model();
			expect ( model ).to.be.an.instanceof( WidgetModel );
		} );

	} );

} );