define( function ( require ) {
	'use strict';

	var sinon = window.sinon;

	var Remoting        = require( 'Remoting' );
	var Vent            = require( 'Vent' );
	var VideoTabsLayout = require( 'videoPlayer/views/VideoTabsLayout' );
	var ContentModel    = require( 'videoPlayer/models/ContentModel' );

	var videoTabsLayout;

	var dummyEvt = {
		'type'           : 'click',
		'preventDefault' : function () {}
	};

	var contentModel = new ContentModel( {
		'ContentName'            : '6th Grade: RI.6.1 & 4 - Critical Reading in Elective Classes',
		'SegmentLengthInSeconds' : 0,
		'Children'               : [],
		'ContentId'              : 7652,
		'ImageURL'               : 'thumb_2182_CC_OR_6ELA_DDeLapp_CCC.jpg',
		'TranscriptFileName'     : 'tr_2182_CC_OR_6ELA_DDeLapp_CCC.pdf',
		'GuidebookFileName'      : 'gb_2182_CC_OR_6ELA_DDeLapp_CCC.pdf',
		'ContentTypeId'          : 6,
		'AudioFileName'          : 'au_2182_CC_OR_6ELA_DDeLapp_CCC.mp3',
		'ContentDescription'     : 'Segment 1 of 1 of this program.'
	} );

	var initVideoTabsLayout = function () {
		videoTabsLayout = new VideoTabsLayout( {
			'contentModel' : contentModel
		} );
	};

	var destroyVideoTabsLayout = function () {
		videoTabsLayout = undefined;
	};

	describe( 'VideoTabsLayout Layout', function () {
		var remotingStub;
		before( function() {
			initVideoTabsLayout();
			remotingStub = sinon.stub( Remoting , 'fetch' ).returns( $.Deferred() );
		} );

		after( function() {
			destroyVideoTabsLayout();
			Remoting.fetch.restore();
			remotingStub = null;
		} );

		it( 'does have `template` property', function () {
			videoTabsLayout.should.have.property( 'template' );
		} );

		it( 'does have `regions` property', function () {
			videoTabsLayout.should.have.property( 'regions' );
		} );

		it( 'does have `ui` property', function () {
			videoTabsLayout.should.have.property( 'ui' );
		} );

		it( 'does have `events` property', function () {
			videoTabsLayout.should.have.property( 'events' );
		} );

		describe( '.events', function () {

			var setUserQueueSpy        = sinon.spy();
			var shareVideoSpy          = sinon.spy();
 			var relatedVideoSpy        = sinon.spy();
			var additionalResourcesSpy = sinon.spy();

			var SpiedObject;


			before( function () {
				SpiedObject = VideoTabsLayout.extend( {
					'setUserQueue'        : setUserQueueSpy,
					'shareVideo'          : shareVideoSpy,
					'relatedVideo'        : relatedVideoSpy,
					'additionalResources' : additionalResourcesSpy
				} );

				videoTabsLayout = new SpiedObject();
				videoTabsLayout.render();
			} );

			after( destroyVideoTabsLayout );

			describe( 'when `Add to Queue` button is clicked', function () {

				it( 'does call `.setUserQueue`', function () {
					videoTabsLayout.ui.userQueue.trigger( 'click' );
					setUserQueueSpy.should.have.been.calledOnce;
				} );

			} );

			describe( 'when `Share` button is clicked', function () {

				it( 'does call `.shareVideo`', function () {
					videoTabsLayout.ui.shareVideo.trigger( 'click' );
					shareVideoSpy.should.have.been.calledOnce;
				} );

			} );

			describe( 'when `Additional Resources` tab is clicked', function () {

				it( 'does call `.additionalResources`', function () {
					videoTabsLayout.ui.additionalResourcesTab.trigger( 'click' );
					additionalResourcesSpy.should.have.been.calledOnce;
				} );

			} );

			describe( 'when `Related Videos` tab is clicked', function () {

				it( 'does call `.relatedVideo`', function () {
					videoTabsLayout.ui.relatedVideoTab.trigger( 'click' );
					relatedVideoSpy.should.have.been.calledOnce;
				} );

			} );

		} );

		describe( '`.initialize`', function () {

			before( initVideoTabsLayout );

			after( destroyVideoTabsLayout );

			it( 'does initialize a user contents collection', function () {
				videoTabsLayout.contentsCollection.should.not.be.undefined;
			} );

			it( 'does have a `contentModel` property', function () {
				videoTabsLayout.should.have.property( 'contentModel' );
			} );

		} );

		describe( '`.onShow`', function () {

			var fetchUserQueueStub;
			var regionShowStub;

			before( function () {
				initVideoTabsLayout();

				fetchUserQueueStub = sinon.spy( videoTabsLayout, 'fetchUserQueue' );
				regionShowStub     = sinon.stub( videoTabsLayout.tabContentRegion, 'show' );

				videoTabsLayout.render().onShow();
			} );

			after( function () {
				videoTabsLayout.fetchUserQueue.restore();
				videoTabsLayout.tabContentRegion.show.restore();
				destroyVideoTabsLayout();
			} );

			it( 'does call `.fetchUserQueue`', function () {
				fetchUserQueueStub.should.have.callCount( 1 );
			} );

			it( 'does show `Additional Resources`', function () {
				regionShowStub.should.have.callCount( 1 );
			} );

		} );

		describe( '`.shareVideo`', function () {

			before( initVideoTabsLayout );

			after( destroyVideoTabsLayout );

			it( 'does trigger `video:show_share_modal` event', function ( done ) {
				Vent.on( 'video:show_share_modal', function () {
					done();
				} );

				videoTabsLayout.shareVideo();
			} );

		} );

		describe( '`.relatedVideo`', function () {

			var setUIRelatedVideoSpy;
			var regionShowStub;

			before( function () {
				initVideoTabsLayout();

				setUIRelatedVideoSpy = sinon.spy( videoTabsLayout, 'setUIRelatedVideo' );
				regionShowStub       = sinon.stub( videoTabsLayout.tabContentRegion, 'show' );

				videoTabsLayout.render().relatedVideo( dummyEvt );
			} );

			after( function () {
				videoTabsLayout.setUIRelatedVideo.restore();
				videoTabsLayout.tabContentRegion.show.restore();
				destroyVideoTabsLayout();
			} );

			it( 'does show `Related Videos`', function () {
				regionShowStub.should.have.callCount( 1 );
			} );

			it( 'does call `.setUIRelatedVideo`', function () {
				setUIRelatedVideoSpy.should.have.callCount( 1 );
			} );

		} );

		describe( '`.additionalResources`', function () {

			var setUIAdditionalResourcesSpy;
			var regionShowStub;

			before( function () {
				initVideoTabsLayout();

				setUIAdditionalResourcesSpy = sinon.spy( videoTabsLayout, 'setUIAdditionalResources' );
				regionShowStub              = sinon.stub( videoTabsLayout.tabContentRegion, 'show' );

				videoTabsLayout.render().additionalResources( dummyEvt );
			} );

			after( function () {
				videoTabsLayout.setUIAdditionalResources.restore();
				videoTabsLayout.tabContentRegion.show.restore();
				destroyVideoTabsLayout();
			} );

			it( 'does show `Related Videos`', function () {
				regionShowStub.should.have.callCount( 1 );
			} );

			it( 'does call `.setUIAdditionalResources`', function () {
				setUIAdditionalResourcesSpy.should.have.callCount( 1 );
			} );

		} );

		describe( '`.setUIAdditionalResources`', function () {

			var $prevActiveTab;

			before( function () {
				initVideoTabsLayout();
				videoTabsLayout.render();
				videoTabsLayout.ui.relatedVideoTab.parent().addClass( 'active' );
				videoTabsLayout.setUIAdditionalResources();
			} );

			after( destroyVideoTabsLayout );

			it( 'does remove active class of the previous active tab', function () {
				videoTabsLayout.ui.relatedVideoTab.parent().hasClass( 'active' ).should.be.false;
			} );

			it( 'does activate `Additional Resources` tab', function () {
				videoTabsLayout.ui.additionalResourcesTab.parent().hasClass( 'active' ).should.be.true;
			} );

		} );

		describe( '`.setUIRelatedVideo`', function () {

			var $prevActiveTab;

			before( function () {
				initVideoTabsLayout();
				videoTabsLayout.render();
				videoTabsLayout.ui.additionalResourcesTab.parent().addClass( 'active' );
				videoTabsLayout.setUIRelatedVideo();
			} );

			after( destroyVideoTabsLayout );

			it( 'does remove active class of the previous active tab', function () {
				videoTabsLayout.ui.additionalResourcesTab.parent().hasClass( 'active' ).should.be.false;
			} );

			it( 'does activate `Additional Resources` tab', function () {
				videoTabsLayout.ui.relatedVideoTab.parent().hasClass( 'active' ).should.be.true;
			} );

		} );

		describe( '`.setUserQueue`', function () {

			var addToUserQueueSpy;

			before( function () {
				initVideoTabsLayout();
			} );

			after( destroyVideoTabsLayout );

			describe( 'when content is in user queue', function () {

				var removeFromUserQueueSpy;

				before( function () {
					removeFromUserQueueSpy = sinon.spy( videoTabsLayout, 'removeFromUserQueue' );
					videoTabsLayout.render();
					sinon.stub( videoTabsLayout, 'isContentInQueue' ).returns( true );
					videoTabsLayout.setUserQueue( dummyEvt );
				} );

				after( function () {
					videoTabsLayout.removeFromUserQueue.restore();
					videoTabsLayout.isContentInQueue.restore();
				} );

				it( 'does call `.removeFromUserQueue`', function () {
					removeFromUserQueueSpy.should.have.been.calledOnce;
				} );

			});

			describe( 'when content is not in user queue', function () {

				var addToUserQueueSpy;

				before( function () {
					addToUserQueueSpy = sinon.spy( videoTabsLayout, 'addToUserQueue' );
					sinon.stub( videoTabsLayout, 'isContentInQueue' ).returns( false );
					videoTabsLayout.render();
					videoTabsLayout.setUserQueue( dummyEvt );
				} );

				after( function () {
					videoTabsLayout.addToUserQueue.restore();
					videoTabsLayout.isContentInQueue.restore();
				} );

				it( 'does call `.removeFromUserQueue`', function () {
					addToUserQueueSpy.should.have.been.calledOnce;
				} );

			});

		} );

		describe( '`.fetchUserQueue`', function () {

			var contentRequestStub;

			before( function () {
				initVideoTabsLayout();
				contentRequestStub = sinon.stub( videoTabsLayout.contentsCollection, 'contentRequest' );
				videoTabsLayout.render().fetchUserQueue();
			} );

			after( function () {
				videoTabsLayout.contentsCollection.contentRequest.restore();
				destroyVideoTabsLayout();
			} );

			it( 'does call `.contentRequest`', function () {
				contentRequestStub.should.have.callCount( 1 );
			} );

		} );

		describe( '`.addToUserQueue`', function () {

			var contentRequestStub;

			before( function () {
				initVideoTabsLayout();
				contentRequestStub = sinon.stub( videoTabsLayout.contentsCollection, 'contentRequest' );
				videoTabsLayout.render().addToUserQueue();
			} );

			after( function () {
				videoTabsLayout.contentsCollection.contentRequest.restore();
				destroyVideoTabsLayout();
			} );

			it( 'does call `.contentRequest`', function () {
				contentRequestStub.should.have.callCount( 1 );
			} );

		} );

		describe( '`.removeFromUserQueue`', function () {

			var contentRequestStub;
			var setQueueBtnUIStub;

			before( function () {
				initVideoTabsLayout();
				contentRequestStub = sinon.stub( videoTabsLayout.contentsCollection, 'contentRequest' );
				videoTabsLayout.render().removeFromUserQueue();
			} );

			after( function () {
				videoTabsLayout.contentsCollection.contentRequest.restore();
				destroyVideoTabsLayout();
			} );

			it( 'does call `.contentRequest`', function () {
				contentRequestStub.should.have.callCount( 1 );
			} );

		} );

		describe( '`.setQueueBtnUI`', function () {

			before( function () {
				initVideoTabsLayout();
			} );

			after( destroyVideoTabsLayout );

			describe( 'when content is in user queue', function () {

				before( function () {
					videoTabsLayout.render();
					sinon.stub( videoTabsLayout, 'isContentInQueue' ).returns( true );
					videoTabsLayout.setQueueBtnUI();
				} );

				after( function () {
					videoTabsLayout.isContentInQueue.restore();
				} );

				it( 'does set button text to `Remove from Queue`', function () {
					videoTabsLayout.ui.userQueue.text().should.eql( 'Remove from Queue' );
				} );

			} );

			describe( 'when content is not in user queue', function () {

				before( function () {
					videoTabsLayout.render();
					sinon.stub( videoTabsLayout, 'isContentInQueue' ).returns( false );
					videoTabsLayout.setQueueBtnUI();
				} );

				after( function () {
					videoTabsLayout.isContentInQueue.restore();
				} );

				it( 'does set button text to `Add to Queue`', function () {
					videoTabsLayout.ui.userQueue.text().should.eql( 'Add to Queue' );
				} );

			} );

		} );

		describe( '`.addToUserContents`', function () {

			before( function () {
				initVideoTabsLayout();
				videoTabsLayout.render();
				sinon.stub( videoTabsLayout, 'setQueueBtnUI' );
				videoTabsLayout.addToUserContents( [ { 'ContentId' : 12345 } ] );
			} );

			after( function () {
				videoTabsLayout.setQueueBtnUI.restore();
				destroyVideoTabsLayout();
			} );

			it( 'does reset the user contents with the passed model', function () {
				videoTabsLayout.contentsCollection.length.should.eql( 1 );
			} );

		} );

		describe( '`.removeItemFromContents`', function () {

			before( function () {
				initVideoTabsLayout();
				videoTabsLayout.render();
				sinon.stub( videoTabsLayout, 'setQueueBtnUI' );
				videoTabsLayout.addToUserContents( [ { 'ContentId' : 7652 } ] );
				videoTabsLayout.removeItemFromContents();
			} );

			after( function () {
				videoTabsLayout.setQueueBtnUI.restore();
				destroyVideoTabsLayout();
			} );

			it( 'does reset the user contents with the passed model', function () {
				videoTabsLayout.contentsCollection.length.should.eql( 0 );
			} );

		} );

		describe( '`.isContentInQueue`', function () {

			before( function () {
				initVideoTabsLayout();
			} );

			after( destroyVideoTabsLayout );

			describe( 'when current segment is not in user queue', function () {

				it( 'does return `false`', function () {
					videoTabsLayout.isContentInQueue().should.be.false;
				} );

			} );

			describe( 'when current segment is in user queue', function () {

				before( function () {
					videoTabsLayout.render();
					sinon.stub( videoTabsLayout, 'setQueueBtnUI' );
					videoTabsLayout.contentsCollection.reset( [ { 'ContentId' : 7652 } ] );
				} );

				after( function () {
					videoTabsLayout.setQueueBtnUI.restore();
				} );

				it( 'does return `true`', function () {
					videoTabsLayout.isContentInQueue().should.not.be.null;
				} );

			} );

		} );

	} );

} );
