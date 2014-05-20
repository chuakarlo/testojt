define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var sinon    = window.sinon;
	var expect   = require( 'chai' ).expect;
	var App      = require( 'App' );

	var ItemView   = require( 'apps/homepage/external/content/views/ContentItemView' );
	var controller = require( 'apps/homepage/external/content/controllers/contentItemController' );


	describe( 'ContentItemView ItemView ', function () {

		var SpiedObjInstance;
		var ItemViewInstance;
		var videoLinkSpy;
		var TestCollection;
		var navigateStub;

		before( function () {

			navigateStub = sinon.stub( App, 'navigate' );

			TestCollection = new Backbone.Collection( [
				{
					'ContentId': 1234,
					'imageUrl': null,
					'ContentName': 'Sample Topic',
					'SegmentLengthInSeconds': 1024,
					'renderToggle': function () {}
				}
			] );

			ItemViewInstance = new ItemView( {
				model: TestCollection.models[ 0 ]
			} );
			ItemViewInstance.render();

			videoLinkSpy = sinon.spy( ItemView.prototype, 'videoLink' );

			SpiedObjInstance = new ItemView( {
				model: TestCollection.models[ 0 ]
			} );
			SpiedObjInstance.render();

		} );

		after( function () {
			App.navigate.restore();
		} );

		it( 'should be an instance of Marionette ItemView', function () {
			var Marionette = require( 'marionette' );
			expect( SpiedObjInstance ).to.be.an.instanceof( Marionette.ItemView );
		} );

		it( 'should have a template', function () {
			expect( SpiedObjInstance.template ).to.not.equal( undefined );
		} );

		it( 'should have a tagName', function () {
			expect( SpiedObjInstance.tagName ).to.not.equal( undefined );
		} );

		it( 'should have a className', function () {
			expect( SpiedObjInstance.className ).to.not.equal( undefined );
		} );

		it( 'should call controller.doVideoLink on click of thumbnail', function () {
			SpiedObjInstance.$el.find( 'a.vid-thumb-overlay' ).first().trigger( 'click' );
			videoLinkSpy.should.have.been.calledOnce;
		} );

		it( 'should call `enableTooltip` ', function () {
			var selectedStub = sinon.stub( controller, 'doEnableTooltip' );

			SpiedObjInstance.enableTooltip();
			selectedStub.callCount.should.be.at.least( 1 );

			controller.doEnableTooltip.restore();
		} );

		it( 'should call `removeFromMyQueue` function ', function () {
			var selectedStub = sinon.stub( controller, 'doRemoveFromQueue' );

			SpiedObjInstance.removeFromMyQueue();
			selectedStub.callCount.should.be.at.least( 1 );

			controller.doRemoveFromQueue.restore();
		} );

		it( 'should call `changeRecommendedIcon` function ', function () {
			var selectedStub = sinon.stub( controller, 'doChangeRecommendedIcon' );

			SpiedObjInstance.changeRecommendedIcon();
			selectedStub.callCount.should.be.at.least( 1 );

			controller.doChangeRecommendedIcon.restore();

		} );

		it( 'should call `addToMyQueue` function ', function () {
			var selectedStub = sinon.stub( controller, 'doAddtoMyQueue' );

			SpiedObjInstance.addToMyQueue();
			selectedStub.callCount.should.be.at.least( 1 );

			controller.doAddtoMyQueue.restore();

		} );

		it( 'should call `removeQueueByRecommended` function ', function () {
			var selectedStub = sinon.stub( controller, 'doRemoveQueueByRecommended' );

			SpiedObjInstance.removeQueueByRecommended();
			selectedStub.callCount.should.be.at.least( 1 );

			controller.doRemoveQueueByRecommended.restore();

		} );

		it( 'should call `viewTags` function ', function () {
			var selectedStub = sinon.stub( controller, 'doViewTags' );

			SpiedObjInstance.viewTags();
			selectedStub.callCount.should.be.at.least( 1 );

			controller.doViewTags.restore();

		} );

		it( 'should call `videoLink` function ', function () {
			var selectedStub = sinon.stub( controller, 'doVideoLink' );

			SpiedObjInstance.videoLink();
			selectedStub.callCount.should.be.at.least( 1 );


			controller.doVideoLink.restore();

		} );

		describe( 'Video thumbnail', function () {
			it( 'should redirect to /#resources/videos/:contentId', function () {
				ItemViewInstance.$el.find( 'a.vid-thumb-overlay' ).first().trigger( 'click' );
				navigateStub.should.have.been.calledWithExactly( 'resources/videos/1234', {
					'trigger': true
				} );
			} );
		} );
	} );

} );