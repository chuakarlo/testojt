define( function ( require ) {
	'use strict';

	var Collection      = require( 'external/external/what-to-do-next/collections/WidgetItemCollection' );
	var WidgetItemModel = require( 'external/external/what-to-do-next/models/WidgetItemModel' );
	var expect          = require( 'chai' ).expect;

	describe( 'WidgetItemCollection Collection', function () {

		before ( function () {
			this.collection = new Collection();
		} );

		it( 'should be an instance of WidgetItemCollection Collection', function () {
			expect( this.collection ).to.be.an.instanceof( Collection );
		} );

		it( 'should have a model of WidgetItemModel instance', function () {
			var model = new this.collection.model();
			expect ( model ).to.be.an.instanceof( WidgetItemModel );
		} );

	} );

} );