define( function ( require ) {
	'use strict';

	var SelectedItemModel = require( 'videoPlayer/models/SelectedItemModel' );

	describe( 'SelectedItemModel', function () {

		it( 'should be an instance of SelectedItemModel', function () {
			var email = new SelectedItemModel();
			email.should.be.an.instanceof( SelectedItemModel );
		} );

	} );

} );
