define( function ( require ) {
	'use strict';

	var sinon = window.sinon;

	var ShareVideoLayout = require( 'videoPlayer/views/share/ShareVideoLayout' );
	var ContentModel     = require( 'videoPlayer/models/ContentModel' );

	describe( 'ShareVideoLayout Layout', function () {

		var shareVideoLayout;
		var contentModel = new ContentModel();

		before( function () {
			shareVideoLayout = new ShareVideoLayout( { 'model' : contentModel } );
		} );

		after( function () {
			shareVideoLayout = undefined;
		} );

		it( 'does have a `template`', function () {
			shareVideoLayout.should.have.property( 'template' );
		} );

		it( 'does have `regions`', function () {
			shareVideoLayout.should.have.property( 'regions' );
		} );

		it( 'does have a `className`', function () {
			shareVideoLayout.should.have.property( 'className' );
		} );

		it( 'does have `ui`', function () {
			shareVideoLayout.should.have.property( 'ui' );
		} );

		it( 'does have `events`', function () {
			shareVideoLayout.should.have.property( 'events' );
		} )

		describe( 'events', function () {

			var searchStub;
			var shareVideoStub;

			before( function () {
				searchStub     = sinon.stub( shareVideoLayout, 'search' );
				shareVideoStub = sinon.stub( shareVideoLayout, 'shareVideo' );

				shareVideoLayout.render();
			} );

			after( function () {
				shareVideoLayout.search.restore();
				shareVideoLayout.shareVideo.restore();
			} );

			describe( 'when keyup in search input', function () {

				it( 'does call `.search`', function ( done ) {
					shareVideoLayout.ui.searchInput.on( 'keyup', function () {
						done();
					} );
					shareVideoLayout.ui.searchInput.trigger( 'keyup' );
				} );

			} );

			describe( 'when share video button is clicked', function () {

				it( 'does call `.shareVideo`', function ( done ) {
					shareVideoLayout.ui.shareButton.on( 'click', function () {
						done();
					} );
					shareVideoLayout.ui.shareButton.trigger( 'click' );
				} );

			} );

		} );

		describe( '.initialize', function () {

			it( 'does copy the passed options', function () {
				shareVideoLayout.model.should.not.be.undefined;
			} );

		} );

		describe( '.onShow', function () {

			var sharedVideoRegionShowStub;

			before( function () {
				sharedVideoRegionShowStub = sinon.stub( shareVideoLayout.sharedVideoRegion, 'show' );
			} );

			after( function () {
				shareVideoLayout.sharedVideoRegion.show.restore();
			} );

			it( 'does show the shared video', function () {
				shareVideoLayout.render().onShow();
				sharedVideoRegionShowStub.should.have.callCount( 1 );
			} );

		} );

	} );

} );
