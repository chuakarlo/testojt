define( function ( require ) {
	'use strict';

	require( 'bootstrap' );

	var sinon = window.sinon;

	var ModalRegion      = require( 'videoPlayer/views/ModalRegion' );
	var ShareVideoLayout = require( 'videoPlayer/views/share/ShareVideoLayout' );
	var ContentModel     = require( 'videoPlayer/models/ContentModel' );

	var modalRegion;
	var shareVideoLayout;
	var onShowSpy;
	var onCloseSpy;
	var contentModel;

	describe( 'ModalRegion Region', function () {

		before( function () {
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

			onShowSpy                       = sinon.spy();
			onCloseSpy                      = sinon.spy();
			modalRegion                     = new ModalRegion();
			shareVideoLayout                = new ShareVideoLayout( { 'model' : contentModel } );
		} );

		it( 'should have an el property', function () {
			modalRegion.should.have.property( 'el' );
		} );

		it( 'should have an `#app-modal` selector', function () {
			modalRegion.$el.selector.should.eql( '#app-modal' );
		} );

		describe( 'ModalRegion `onShow` method', function () {
			before( function () {
				modalRegion.on( 'show', onShowSpy );
				modalRegion.show( shareVideoLayout );
			} );

			it( 'should show the share video modal dialog', function () {
				onShowSpy.should.have.been.calledOnce;
			} );
		} );

		describe( 'ModalRegion `onClose` method', function () {
			before( function () {
				modalRegion.on( 'close', onCloseSpy );
				modalRegion.show( shareVideoLayout );
				modalRegion.close();
			} );

			it ( 'should close the share video modal dialog', function () {
				onCloseSpy.should.have.been.calledOnce;
			} );
		} );

	} );

} );
