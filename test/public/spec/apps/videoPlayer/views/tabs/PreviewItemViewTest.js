define( function ( require ) {
	'use strict';

	var sinon    = require( 'sinon' );
	var Backbone = require( 'backbone' );
	var Preview  = require( 'videoPlayer/views/tabs/PreviewItemView' );


	describe( 'description', function () {

		var preview;
		var Item = Backbone.Model.extend();

		before( function () {
			preview = new Preview( {
				'model' : new Item( {
					'previewPath' : ''
				} )
			} );
		} );

		after( function () {
			preview = undefined;
		} );

		it( 'does have a `template`', function () {
			preview.should.have.property( 'template' );
		} );

		it( 'does have a `className`', function () {
			preview.should.have.property( 'className' );
		} );

		it( 'does have `templateHelpersp`', function () {
			preview.should.have.property( 'templateHelpers' );
		} );

	} );

} );
