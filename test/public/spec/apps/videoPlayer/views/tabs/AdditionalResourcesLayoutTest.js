define( function ( require ) {
	'use strict';

	var $     = require( 'jquery' );
	var sinon = window.sinon;

	var Remoting = require( 'Remoting' );
	var AdditionalResourcesLayout = require( 'videoPlayer/views/tabs/AdditionalResourcesLayout' );

	describe( 'AdditionalResourceLayout Layout', function () {

		var additionalResourcesLayout;

		before( function () {
			sinon.stub( Remoting , 'fetch' ).returns( $.Deferred() );
			additionalResourcesLayout = new AdditionalResourcesLayout();
		} );

		after( function () {
			Remoting.fetch.restore();
		} );

		it( 'should should be an instance of `AdditionalResourceLayout`', function () {
			additionalResourcesLayout.should.be.an.instanceof( AdditionalResourcesLayout );
		} );

		it( 'should have a `template` property', function () {
			additionalResourcesLayout.should.have.property( 'template' );
		} );

		it( 'should have a `regions` property', function () {
			additionalResourcesLayout.should.have.property( 'regions' );
		} );

		describe( '`onShow` method', function () {

			before( function () {
				additionalResourcesLayout.render().onShow();
			} );

			it( 'should display videoResourceRegion region', function () {
				var $videoResource = additionalResourcesLayout.$el.find( '.video-resource' );
				$videoResource.should.have.length( 1 );
			} );

			it( 'should display videoSegmentRegion region', function () {
				var $videoSegment = additionalResourcesLayout.$el.find( '.video-segment' );
				$videoSegment.should.have.length( 1 );
			} );

		} );

	} );
} );
