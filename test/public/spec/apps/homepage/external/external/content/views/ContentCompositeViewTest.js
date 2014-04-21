define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var expect   = require( 'chai' ).expect;

	var QueueModel           = Backbone.Model.extend( {} );
	var ContentCompositeView = require ( 'apps/homepage/external/content/views/ContentCompositeView' );
	var recommendedBase      = require( 'apps/homepage/external/content/external/recommended/base' );

	describe( 'ContentCompositeView', function () {
		var queueModel;
		var compositeView;

		before ( function () {
			queueModel    = new QueueModel( { 'baseObject' : recommendedBase } );
			compositeView = new ContentCompositeView( { 'model' : queueModel } );
			console.log( recommendedBase );
		} );

		it ( 'should have a `template` property', function () {
			expect( compositeView.template ).to.not.equal( undefined );
		} );

		it ( 'should have a `itemView` property', function () {
			expect( compositeView.itemView ).to.not.equal( undefined );
		} );

		it ( 'should have a `className` property', function () {
			expect( compositeView.className ).to.not.equal( undefined );
		} );

		it ( 'should have a `templateHelpers` property', function () {
			expect( compositeView.templateHelpers() ).to.not.equal( undefined );
		} );

		it ( 'should have a `itemViewOptions` property', function () {
			expect( compositeView.itemViewOptions() ).to.not.equal( undefined );
		} );

	} );

} );