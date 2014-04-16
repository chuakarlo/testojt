define( function ( require ) {
	'use strict';

	var Marionette       = require( 'marionette' );
	var expect           = require( 'chai' ).expect;
	var base             = require( 'apps/homepage/external/what-to-do-next/external/learning-targets/base' );

	describe ( 'Learning Targets WidgetItemView', function () {

		var model;
		var itemView;

		before ( function ( done ) {
			var ItemView = require( 'apps/homepage/external/what-to-do-next/external/learning-targets/views/WidgetItemView' );

			var getCollection = base._items;
			getCollection ( function ( collection ) {
				model    = collection.models[0];
				itemView = new ItemView ( { 'model' : model } );
				done ();
			} );
			itemView = new ItemView();
		} );

		it( 'should be an instance of ItemView ', function () {
			expect( itemView ).to.be.an.instanceof( Marionette.ItemView );
		} );

		it( 'should have a template', function () {
			expect( itemView.template ).to.not.be.equal( undefined );
		} );

		it( 'should have a className', function () {
			expect( itemView.className ).to.not.be.equal( undefined );
		} );

	} );

} );