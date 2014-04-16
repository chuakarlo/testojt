define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	var QueueModel           = Backbone.Model.extend( {} );
	var ContentCompositeView = require ( 'apps/homepage/external/content/views/ContentCompositeView' );
	var recommendedBase      = require( 'apps/homepage/external/content/external/recommended/base' );

	describe( 'ContentCompositeView', function () {
		var queueModel;
		var compositeView;

		before ( function () {
			queueModel    = new QueueModel( { 'baseObject' : recommendedBase } );
			compositeView = new ContentCompositeView( { 'model' : queueModel } );
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

		it ( 'should have `templateHelpers` property', function () {
			compositeView.should.have.property( 'templateHelpers' );
		} );

		it ( 'should have `itemViewOptions` property', function () {
			compositeView.should.have.property( 'itemViewOptions' );
		} );

	} );

} );