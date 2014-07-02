define( function ( require ) {
	'use strict';

	var Backbone             = require( 'backbone' );
	var App                  = require( 'App' );
	var sinon = window.sinon;
	var ContentCompositeView = require ( 'apps/homepage/external/content3/views/ContentCompositeView' );
	var recommendedBase      = require( 'apps/homepage/external/content3/external/recommended/base' );

	describe( 'ContentCompositeView', function () {
		var compositeView;

		before ( function () {
			App.reqres.setHandler( 'pd360:available', sinon.spy() );
			var model = new ( Backbone.Model.extend(  ) )();
			model.attributes = recommendedBase;
			compositeView = new ContentCompositeView( { 'model' :  model } );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
		} );

		it ( 'should have `template` property', function () {
			compositeView.should.have.property( 'template' );
		} );

		it ( 'should have `itemView` property', function () {
			compositeView.should.have.property( 'itemView' );
		} );

		it ( 'should have `className` property', function () {
			compositeView.should.have.property( 'className' );
		} );

	} );

} );
