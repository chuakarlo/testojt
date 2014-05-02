define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	var ContentModel         = Backbone.Model.extend( {} );
	var ContentCompositeView = require( 'apps/homepage/external/content/views/ContentCompositeView' );
	var recommendedBaseObj   = require( 'apps/homepage/external/content/external/recommended/base' );
	var controller           = require( 'apps/homepage/external/content/controllers/contentCompositeController' );

	describe( 'contentCompositeController', function () {
		var contentModel;
		var contentCompositeView;

		before ( function () {
			contentModel         = new ContentModel( { 'baseObject' : recommendedBaseObj } );
			contentCompositeView = new ContentCompositeView( { 'model' : contentModel } );
		} );

		it( 'should return a parentView on `doItemViewOptions`', function () {
			var doItemViewOptions = controller.doItemViewOptions( contentCompositeView );
			doItemViewOptions.parentView.should.be.equal( contentCompositeView );
		} );
	} );

} );