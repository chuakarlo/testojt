define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );

	var Controller   = require( 'videoPlayer/controllers/AppController' );
	var ContentModel = require( 'videoPlayer/models/ContentModel' );

	describe( 'AppController Test', function () {

		var contentModel;
		var controller;
		var contentRegion = new Marionette.Region( { 'el' : $( '#content' ) } );

		// router spy for this.App.Router.navigate() assertions
		var navigateURL = '';
		var router      = {
			'navigate' : function ( url ) {
				navigateURL = url;
			}
		};

		var createController = function () {
			controller = new Controller( {
				'App'     : {
					'Router' : router
				},
				'regions' : {
					'content' : contentRegion
				}
			} );
		};

		var destroyController = function () {
			contentRegion.reset();
			controller.stopListening();
			controller = undefined;
			Backbone.history.navigate( '' );
			navigateURL = '';
		};

		describe( '_setContent()', function () {

			before( createController );
			after( destroyController );

			describe( 'when passed a Marionette.View constructor', function () {

				describe( 'without an options hash', function () {

					var view;

					before( function () {
						view = controller._setContent( Marionette.View );
					} );

					it( 'should return an instantiated Marionette.View', function () {
						view.should.be.an.instanceof( Marionette.View );
					} );

					it( 'should be the new currentView of `controller.regions.content`', function () {
						controller.regions.content.currentView.should.equal( view );
					} );

				} );

				describe( 'with an options hash', function () {

					var view, options;

					before( function () {
						options = { 'fake' : 'fake' };
						view    = controller._setContent( Marionette.View, options );
					} );

					it( 'should return an instantiated Marionette.View', function () {
						view.should.be.an.instanceof( Marionette.View );
					} );

					it( 'should pass the hash to the view', function () {
						view.options.should.have.property('fake');
					} );

					it( 'should be the new currentView of `controller.regions.content`', function () {
						controller.regions.content.currentView.should.equal( view );
					} );

				} );

			} );

			describe( 'when passed a Marionette.View instance', function () {

				var view, options;

				before( function () {
					view = new Marionette.View();
					controller._setContent( view );
				} );

				it( 'should be the new currentView of `controller.regions.content`', function () {
					controller.regions.content.currentView.should.equal( view );
				} );

			} );

		} );

		describe( '_errorHandler()', function () {

			describe( '`SessionError`', function () {

				before( createController );
				after( destroyController );

				it( 'should navigate to login', function () {
					controller._errorHandler( {
						'name'    : 'SessionError',
						'message' : 'No session found.'
					} );
					navigateURL.should.equal( 'login' );
				} );

			} );

			describe( 'XHR/jqXHR error', function () {

				before( createController );
				after( destroyController );

				it( 'should use the statusText and show the errorView', function ( done ) {
					controller._errorHandler( {
						'readyState' : 1,
						'status'     : '404',
						'statusText' : 'Unavailable'
					} );
					setTimeout( function () {
						controller.regions.content.currentView.$el.html().should.equal( 'Unavailable' );
						done();
					}, 10 );
				} );

			} );

			describe( 'string', function () {

				before( createController );
				after( destroyController );

				it( 'should use the statusText and show the errorView', function ( done ) {
					controller._errorHandler( 'There was an error' );
					setTimeout( function () {
						controller.regions.content.currentView.$el.html().should.equal( 'There was an error' );
						done();
					}, 10 );
				} );

			} );

			describe( 'generic object', function () {

				before( createController );
				after( destroyController );

				it( 'should use the statusText and show the errorView', function ( done ) {
					controller._errorHandler( {
						'message' : 'There was an error'
					} );
					setTimeout( function () {
						controller.regions.content.currentView.$el.html().should.equal( 'There was an error' );
						done();
					}, 10 );
				} );

			} );

		} );

		describe( '`_prepareModel` method', function () {

			before( createController );
			after( destroyController );

			contentModel = new ContentModel( {
				'Modified'               : 'January, 30 2014 12:23:19',
				'ContentId'              : 7652,
				'Remover'                : '',
				'ImageURL'               : 'thumb_2182_CC_OR_6ELA_DDeLapp_CCC.jpg',
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

			it( 'should append the URL root to the ImageURL', function () {
				controller._prepareModel( contentModel );

				var imageUrl = contentModel.get( 'ImageURL' );
				imageUrl.should.eql( 'http://resources.pd360.com/PD360/media/thumb/thumb_2182_CC_OR_6ELA_DDeLapp_CCC.jpg' );
			} );

		} );

	} );

} );
