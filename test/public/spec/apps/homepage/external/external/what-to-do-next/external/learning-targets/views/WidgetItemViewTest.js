define( function ( require ) {
	'use strict';

	var Marionette       = require( 'marionette' );
	var expect           = require( 'chai' ).expect;
	var base             = require( 'external/external/what-to-do-next/external/learning-targets/base' );

	describe ( 'Learning Targets WidgetItemView', function () {
		before ( function ( done ) {
			var ItemView = require( 'external/external/what-to-do-next/external/learning-targets/views/WidgetItemView' );
			var that = this;

			var getCollection = base._items;
			getCollection ( function ( collection ) {
				that.model    = collection.models[0];
				that.itemView = new ItemView ( { 'model' : that.model } );
				done ();
			} );
			this.itemView = new ItemView();
		} );

		it( 'should be an instance of ItemView ', function () {
			expect( this.itemView ).to.be.an.instanceof( Marionette.ItemView );
		} );

		it( 'should have a template', function () {
			expect( this.itemView.template ).to.not.be.equal( undefined );
		} );

		it( 'should have a className', function () {
			expect( this.itemView.className ).to.not.be.equal( undefined );
		} );

	} );

} );