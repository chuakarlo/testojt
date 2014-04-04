define( function ( require ) {
	'use strict';

	var NavLayout = require( 'videoPlayer/views/NavLayout' );

	describe( 'NavLayout Layout', function () {
		var navLayout = new NavLayout();

		it('should be an instance of NavLayout Layout', function () {
			navLayout.should.be.an.instanceof( NavLayout );
		} );

		it( 'should have a class of nav-bar', function () {
			navLayout.className.should.eql( 'nav-bar' );
		} );
	} );

} );
