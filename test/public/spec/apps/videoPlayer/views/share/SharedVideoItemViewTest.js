define( function ( require ) {
	'use strict';

	var SharedVideoItemView = require( 'videoPlayer/views/share/SharedVideoItemView' );

	describe( 'SharedVideoItemView', function () {
		//set up and teardown test data - test video to share
		before( function () {
			this.view = new SharedVideoItemView();
		} );

		after( function () {
			this.view = null;
		} );

		/**
		 * Verify that the view creates an element based on the template
		 */
		describe( 'SharedVideoItemView', function () {

			it( 'should be an instance of SharedVideoItemView', function () {
				this.view.should.be.an.instanceof( SharedVideoItemView );
			} );

			it( 'should have a `template` property', function () {
				this.view.should.have.property( 'template' );
			} );

		} );

	} );

} );
