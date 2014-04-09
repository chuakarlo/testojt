define( function ( require ) {
	'use strict';

	// test libraries
	var sinon = window.sinon;

	// dependency modules
	var $     = require( 'jquery' );
	var SharedVideoItemView = require( 'videoPlayer/views/share/SharedVideoItemView' );
	var ContentModel        = require( 'videoPlayer/models/ContentModel' );

	require( 'videoPlayer/utils/selectText' );

	describe( 'SharedVideoItemView', function () {
		var sharedVideoItemView;

		before( function () {
			sharedVideoItemView = new SharedVideoItemView( {
				'model' : new ContentModel( {
					'ImageURL'               : '',
					'ContentName'            : '',
					'SegmentLengthInSeconds' : '',
					'ContentId'              : ''
				} )
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
