define( function ( require ) {
	'use strict';

	var Collection      = require( 'apps/homepage/external/what-to-do-next/collections/WidgetItemCollection' );
	var WidgetItemModel = require( 'apps/homepage/external/what-to-do-next/models/WidgetItemModel' );
	var expect          = require( 'chai' ).expect;

	describe( 'WidgetItemCollection Collection', function () {

		var collection;

		before ( function () {
			collection = new Collection();
		} );

		it( 'should be an instance of WidgetItemCollection Collection', function () {
			expect( collection ).to.be.an.instanceof( Collection );
		} );

		it( 'should have a model of WidgetItemModel instance', function () {
			var model = new collection.model();
			expect ( model ).to.be.an.instanceof( WidgetItemModel );
		} );

	} );

} );