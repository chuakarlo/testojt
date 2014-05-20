define( function ( require ) {
	'use strict';

	// dependency modules
	var SharedVideoItemView = require( 'videoPlayer/views/share/SharedVideoItemView' );
	var Backbone            = require( 'backbone' );

	require( 'videoPlayer/plugins/selectText' );

	describe( 'SharedVideoItemView', function () {
		var sharedVideoItemView;

		before( function () {
			sharedVideoItemView = new SharedVideoItemView( {
				'model' : new Backbone.Model()
			} );
		} );

		after( function () {
			sharedVideoItemView = undefined;
		} );

		it( 'does have `.template`', function () {
			sharedVideoItemView.should.have.property( 'template' );
		} );

		it( 'does have `.className`', function () {
			sharedVideoItemView.should.have.property( 'className' );
		} );

		it( 'does have `.ui`', function () {
			sharedVideoItemView.should.have.property( 'ui' );
		} );

		it( 'does have `.events`', function () {
			sharedVideoItemView.should.have.property( 'events' );
		} );

	} );

} );
