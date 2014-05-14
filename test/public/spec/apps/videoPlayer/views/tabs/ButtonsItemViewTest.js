define( function ( require ) {
	'use strict';

	require( 'bootstrap' );

	var $               = require( 'jquery' );
	var sinon           = window.sinon;
	var Remoting        = require( 'Remoting' );
	var App             = require( 'App' );
	var ButtonsItemView = require( 'videoPlayer/views/tabs/ButtonsItemView' );

	require( 'videoPlayer/entities/Entities' );

	describe( 'ButtonsItemView', function () {

		var buttonsItemView;
		var contentModel;

		before( function () {
			contentModel = new App.VideoPlayer.Entities.Content( {
				'ContentId'   : 7652,
				'ContentName' : '',
				'ImageURL'    : 'thumb_2182_CC_OR_6ELA_DDeLapp_CCC.jpg',
				'queued'      : false
			} );

			buttonsItemView = new ButtonsItemView( {
				'model' : contentModel
			} );

			var stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
			buttonsItemView = undefined;
		} );

		it( 'does have a template', function () {
			buttonsItemView.should.have.property( 'template' );
		} );

		it( 'does have a className', function () {
			buttonsItemView.should.have.property( 'className' );
		} );

		it( 'does have a ui', function () {
			buttonsItemView.should.have.property( 'ui' );
		} );

		it( 'does have an events', function () {
			buttonsItemView.should.have.property( 'events' );
		} );

		describe( '.onShow', function () {

			var setQueueBtnUISpy;

			before( function () {
				setQueueBtnUISpy = sinon.spy( buttonsItemView, 'setQueueBtnUI' );
			} );

			after( function () {
				buttonsItemView.setQueueBtnUI.restore();
			} );

			it( 'does set queue button state', function () {
				setQueueBtnUISpy.should.have.callCount( 0 );
				buttonsItemView.render().onShow();
				setQueueBtnUISpy.should.have.callCount( 1 );
			} );

		} );

		describe( 'when the video is not in queue', function () {

			var evt;
			var removeFromQueueSpy;
			var addToQueueSpy;

			before( function () {
				sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

				evt                = { 'preventDefault' : function () {} };
				removeFromQueueSpy = sinon.spy( buttonsItemView, 'removeContentFromQueue' );
				addToQueueSpy      = sinon.spy( buttonsItemView, 'addContentToQueue' );
			} );

			after( function () {
				Remoting.fetch.restore();
				buttonsItemView.removeContentFromQueue.restore();
				buttonsItemView.addContentToQueue.restore();
			} );

			it( 'does add call .addContentToQueue', function () {
				removeFromQueueSpy.should.have.callCount( 0 );
				addToQueueSpy.should.have.callCount( 0 );
				buttonsItemView.render();
				buttonsItemView.setUserQueue( evt );
				removeFromQueueSpy.should.have.callCount( 0 );
				addToQueueSpy.should.have.callCount( 1 );
			} );

			it( 'does set the button text to `Add to Queue`', function () {
				buttonsItemView.setQueueBtnUI();
				buttonsItemView.ui.userQueue.text().should.eql( 'Add to Queue' );
			} );

		} );

		describe( 'when video the video is in queue', function () {

			var evt;
			var removeFromQueueSpy;
			var addToQueueSpy;
			var buttonsItemView;
			var contentModel;

			before( function () {
				sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

				contentModel       = new App.VideoPlayer.Entities.Content( { 'queued' : true } );
				buttonsItemView    = new ButtonsItemView( { 'model' : contentModel } );
				evt                = { 'preventDefault' : function () {} };
				removeFromQueueSpy = sinon.spy( buttonsItemView, 'removeContentFromQueue' );
				addToQueueSpy      = sinon.spy( buttonsItemView, 'addContentToQueue' );
			} );

			after( function () {
				Remoting.fetch.restore();
				buttonsItemView.removeContentFromQueue.restore();
				buttonsItemView.addContentToQueue.restore();
				buttonsItemView = undefined;
			} );

			it( 'does add call .removeContentFromQueue', function () {
				removeFromQueueSpy.should.have.callCount( 0 );
				addToQueueSpy.should.have.callCount( 0 );
				buttonsItemView.render();
				buttonsItemView.setUserQueue( evt );
				removeFromQueueSpy.should.have.callCount( 1 );
				addToQueueSpy.should.have.callCount( 0 );
			} );

			it( 'does set the button text to `Remove from Queue`', function () {
				buttonsItemView.setQueueBtnUI();
				buttonsItemView.ui.userQueue.text().should.eql( 'Remove from Queue' );
			} );

		} );

		describe( '.addContentToQueue', function () {

			before( function () {
				var stub = sinon.stub().returns( App.Deferred() );
				App.reqres.setHandler( 'common:addToQueue', stub );
			} );

			after( function () {
				App.reqres.removeHandler( 'common:addToQueue' );
			} );

			it( 'does add content to queue', function () {
				buttonsItemView.addContentToQueue();
			} );

		} );

		describe( '.removeContentFromQueue', function () {

			before( function () {
				var stub = sinon.stub().returns( App.Deferred() );
				App.reqres.setHandler( 'common:removeFromQueue', stub );
			} );

			after( function () {
				App.reqres.removeHandler( 'common:removeFromQueue' );
			} );

			it( 'does remove content from queue', function () {
				buttonsItemView.removeContentFromQueue();
			} );

		} );

		describe( '.showShareDialog', function () {

			var evt = { 'preventDefault' : function () {} };

			before( function () {
				sinon.stub( App.VideoPlayer.Controller.Show, 'showShareVideoDialog' );
			} );

			after( function () {
				App.VideoPlayer.Controller.Show.showShareVideoDialog.restore();
			} );

			it( 'does fire `videoPlayer:showShareDialog` event', function ( done ) {
				App.vent.on( 'videoPlayer:showShareDialog', function () {
					done();
				} );

				buttonsItemView.showShareDialog( evt );
			} );

		} );

	} );

} );
