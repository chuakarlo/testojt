define( function ( require ) {
	'use strict';

	var $         = require( 'jquery' );
	var sinon     = window.sinon;

	var Remoting          = require( 'Remoting' );
	var PageLayout        = require( 'videoPlayer/views/PageLayout' );
	var VideoPlayerLayout = require( 'videoPlayer/views/VideoPlayerLayout' );
	var ContentModel      = require( 'videoPlayer/models/ContentModel' );

	var pageLayout;
	var initializePlayerSpy;
	var contentModel;

	describe( 'PageLayout Layout', function () {

		contentModel = new ContentModel( {
			'Modified'               : 'January, 30 2014 12:23:19',
			'ContentId'              : 7652,
			'Remover'                : '',
			'ImageURL'               : '',
			'ContentTypeId'          : 6,
			'Creator'                : 0,
			'Removed'                : '',
			'ProgramName'            : '',
			'AudioFileName'          : 'au_2182_CC_OR_6ELA_DDeLapp_CCC.mp3',
			'ContentDescription'     : 'Segment 1 of 1 of this program.',
			'SearchData'             : '',
			'Tags'                   : [],
			'ContentName'            : '6th Grade: RI.6.1 & 4 - Critical Reading in Elective Classes',
			'SegmentLengthInSeconds' : 192,
			'TranscriptFileName'     : 'tr_2182_CC_OR_6ELA_DDeLapp_CCC.pdf',
			'Modifier'               : 0,
			'Presenters'             : [],
			'Topics'                 : [],
			'EditionName'            : '',
			'SKU'                    : 2182,
			'FileName'               : '2182_CC_OR_6ELA_DDeLapp_CCC.mp4',
			'Created'                : 'January, 23 2014 10:36:40',
			'ContentParentId'        : 0,
			'GuidebookFileName'      : 'gb_2182_CC_OR_6ELA_DDeLapp_CCC.pdf',
			'PreviewVideoName'       : 'pre_2182_CC_OR_6ELA_DDeLapp_CCC.mp4',
			'PresentationOrder'      : 13000
		} );

		before( function () {
			pageLayout                                   = new PageLayout( { 'model' : contentModel } );
			initializePlayerSpy                          = sinon.spy();
			VideoPlayerLayout.prototype.initializePlayer = initializePlayerSpy;
			} );

		it( 'should be an instance of PageLayout', function () {
			pageLayout.should.be.an.instanceof( PageLayout );
		} );

		it( 'should have template property', function () {
			pageLayout.should.have.property( 'template' );
		} );

		it( 'should have regions property', function () {
			pageLayout.should.have.property( 'regions' );
		} );

		describe( 'onShow', function () {

			before( function () {
				// Stubbing fetch since most ajax calls are executed
				// on showing of regions ( ex. ReflectionLayout onShow )
				sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );
				pageLayout.render().onShow();
			} );

			after( function () {
				Remoting.fetch.restore();
			} );

			it( 'should contain section #video-container', function () {
				var $videoRegion = pageLayout.$el.find( '#video-container' );
				$videoRegion.should.have.length.above( 0 );
			} );

			it( 'should contain section #video-tabs', function () {
				var $videoTabsRegion = pageLayout.$el.find( '#video-tabs' );
				$videoTabsRegion.should.have.length.above( 0 );
			} );

			it( 'should call initializePlayer method', function () {
				initializePlayerSpy.should.have.been.calledOnce;
			} );
		} );

		describe( 'showVideoInfo method ', function ( ) {

			before( function () {
				pageLayout.render().showVideoInfo();
			} );

			it( 'should display a popover', function () {
				var $popover = pageLayout.$el.find( '#info-video' );
				$popover.should.have.length.above( 0 );
			} );
		} );
	} );
} );
