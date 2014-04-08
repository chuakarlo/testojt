define( function ( require ) {
	'use strict';

	var sinon    = window.sinon;

	var VideoResourceItemView = require( 'videoPlayer/views/tabs/VideoResourceItemView' );
	var VideoResourceModel    = require( 'videoPlayer/models/VideoResourceModel' );

	describe( 'VideoResource ItemView', function () {
		var videoResource;
		var videoResourceItemView;

		//set up and teardown test data - additional resources- video resource
		before( function () {
			videoResource = new VideoResourceModel( {
				'downloadPath' : 'thisurl',
				'previewPath'  : 'thisurl',
				'thumbnail'    : ''
			} );

			videoResourceItemView = new VideoResourceItemView( {
				'model' : videoResource
			} );

			videoResourceItemView.render();
		} );

		/**
		 * Verify that the view is an instance of the video resource itemview
		 */
		describe( 'Video Resource ItemView', function () {

			it( 'does have  instance of VideoResourceItemView', function () {
				videoResourceItemView.should.be.an.instanceof( VideoResourceItemView );
			} );

			it( 'does have  `template` property', function () {
				videoResourceItemView.should.have.property( 'template' );
			} );

			it( 'does have  `tagName` property', function () {
				videoResourceItemView.should.have.property( 'tagName' );
			} );

			it( 'does have  `ui` property', function () {
				videoResourceItemView.should.have.property( 'ui' );
			} );

			it( 'does have  `events` property', function () {
				videoResourceItemView.should.have.property( 'events' );
			} );

			it( 'does create a `LI` element', function () {
				videoResourceItemView.el.nodeName.should.equal( 'LI' );
			} );

		} );

		/**
		 * Verify that the model  in item view
		 */
		describe( 'Data Model stored in itemView', function () {
			/**
			 * model is the same to that of data being set at the beginning
			 */
			it( 'should have the same data to the data being passed', function () {
				videoResourceItemView.model.should.equal( videoResource );
			} );
			/**
			 * model in the view is an instance of VideoResourceModel
			 */
			it( 'should be an instance of the VideoResourceModel', function () {
				videoResourceItemView.model.should.be.an.instanceof( VideoResourceModel );
			} );

		} );

		describe( '.previewFile', function () {
			var isPreviewStub;

			before( function () {
				videoResourceItemView.previewFile();
			} );

			describe( 'when isPreview is false', function () {

				before( function () {
					isPreviewStub = sinon.stub( videoResourceItemView, 'isPreview' ).returns( false );
				} );

				after( function () {
					videoResourceItemView.isPreview.restore();
					isPreviewStub = null;
				} );

				it( 'does return false', function () {
					videoResourceItemView.previewFile().should.equal( false );
				} );

			} );

			describe( 'when isPreview is true', function () {
				var isIEStub;

				before( function () {
					isPreviewStub = sinon.stub( videoResourceItemView, 'isPreview' );
					isIEStub      = sinon.stub( videoResourceItemView, 'isIE' );
				} );

				after( function () {
					videoResourceItemView.isPreview.restore();
					isPreviewStub = null;
					isIEStub      = null;
				} );

				it( 'does call isIE', function () {
					isPreviewStub.returns( true );
					videoResourceItemView.previewFile();
					isIEStub.should.have.callCount( 1 );
				} );

				describe( 'when isIE is true', function () {
					var checkForPdfPluginStub;

					before( function () {
						checkForPdfPluginStub = sinon.stub( videoResourceItemView, 'checkForPdfPlugin' ).returns( true );
					} );

					after( function () {
						videoResourceItemView.checkForPdfPlugin.restore();
						isIEStub = null;
					} );

					it( 'does call checkForPdfPlugin', function () {
						isIEStub.returns( true );
						videoResourceItemView.previewFile();
						checkForPdfPluginStub.should.have.callCount( 1 );
					} );

					describe( 'when checkForPdfPlugin is true', function () {
						var showPdfModalSpy;

						before( function () {
							checkForPdfPluginStub.returns( true );
							showPdfModalSpy = sinon.spy( videoResourceItemView, 'showPdfModal' );
						} );

						after( function () {
							videoResourceItemView.showPdfModal.restore();
							checkForPdfPluginStub = null;
						} );

						it( 'does call showPdfModal', function () {
							videoResourceItemView.showPdfModal();
							showPdfModalSpy.should.have.callCount( 1 );
						} );

						it( 'does show modal', function () {
							videoResourceItemView.ui.pdfModal.modal( 'show' );
							var $modal = videoResourceItemView.$el.find( '.modal' );
							$modal.should.have.length( 1 );
						} );
					} );
				} );
			} );
		} );

		describe( '.showPdfModal', function () {

			before( function () {
				videoResourceItemView.showPdfModal();
			} );

			it( 'should show a modal', function () {
				videoResourceItemView.ui.pdfModal.modal( 'show' );
				var $modal = videoResourceItemView.$el.find( '.modal' );
				$modal.should.have.length( 1 );
			} );

		} );

		describe( '.isPreview', function () {

			before( function () {
				videoResourceItemView.isPreview();
			} );

			it( 'does get previewPath model', function () {
				videoResourceItemView.model.get( 'previewPath' ).should.equal( 'thisurl');
			} );

			it( 'does return the previewPath if not empty', function () {
				var previewPath = videoResourceItemView.model.get( 'previewPath' );
				videoResourceItemView.isPreview().should.equal( previewPath );
			} );

			it( 'does return false if previewPath is empty', function () {
				videoResourceItemView.model.set( 'previewPath', '' );
				videoResourceItemView.isPreview().should.equal( false );
			} );

		} );

		describe( '.checkForPdfPlugin', function () {
			var getPDFPluginSpy;

			before( function () {
				getPDFPluginSpy = sinon.spy( videoResourceItemView, 'getPDFPlugin' );
				videoResourceItemView.checkForPdfPlugin();
			} );

			it( 'does call `.getPDFPlugin`', function () {
				getPDFPluginSpy.should.have.callCount( 1 );
			} );
		} );

		describe( '.getPDFPlugin', function () {
			var getActiveXObjectSpy;

			before( function () {
				getActiveXObjectSpy = sinon.spy( videoResourceItemView, 'getActiveXObject' );
				videoResourceItemView.getPDFPlugin();
			} );

			it( 'does call `.getActiveXObject` twice', function () {
				getActiveXObjectSpy.should.have.callCount( 2 );
			} );
		} );
	} );
} );
