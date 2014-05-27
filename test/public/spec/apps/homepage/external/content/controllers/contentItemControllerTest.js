define( function ( require ) {
	'use strict';

	var Backbone   = require( 'backbone' );
	var sinon      = window.sinon;
	var utils      = require( 'apps/homepage/external/content/utils/contentItemUtil' );
	var controller = require( 'apps/homepage/external/content/controllers/contentItemController' );
	var ItemView   = require( 'apps/homepage/external/content/views/ContentItemView' );
	var App        = require('App');
	describe( 'contentItemController ', function () {
		var SpiedObjInstance;
		var TestCollection;

		var switchRemoveStub;
		var addItemToQueueStub;
		var appRequestStub;

		var evt;

		before( function () {

			evt = document.createEvent( 'Event' );

			switchRemoveStub = sinon.stub( utils, 'switchRemove' );
			addItemToQueueStub = sinon.stub( utils, 'addItemToQueue' );
			appRequestStub = sinon.stub(App, 'request');

			TestCollection = new Backbone.Collection( [
				{
					'ContentId'              : 1234,
					'imageUrl'               : null,
					'ContentName'            : 'Sample Topic',
					'SegmentLengthInSeconds' : 1024,
					'renderToggle'           : function () {},
					'Tags'                   : true
				}
			] );

			SpiedObjInstance = new ItemView( {
				'model' : TestCollection.models[ 0 ]
			} );
			SpiedObjInstance.render();
		} );

		after( function () {
			utils.switchRemove.restore();
			utils.addItemToQueue.restore();
		} );

		it( 'should call `doAddtoMyQueue`', function () {
			controller.doAddtoMyQueue( SpiedObjInstance, evt );
			switchRemoveStub.callCount.should.be.at.least( 1 );
			addItemToQueueStub.callCount.should.be.at.least( 1 );
		} );

		it( 'should call `doEnableTooltip`', function () {
			var doEnableTooltipSpy = sinon.spy( controller.doEnableTooltip );
			doEnableTooltipSpy( evt );
			doEnableTooltipSpy.callCount.should.be.at.least( 1 );
		} );

		it( 'should call `doRemoveFromQueue`', function () {
			var doRemoveFromQueueSpy = sinon.spy( controller.doRemoveFromQueue );
			doRemoveFromQueueSpy( SpiedObjInstance, evt );
			appRequestStub.callCount.should.be.at.least(1);
			doRemoveFromQueueSpy.callCount.should.be.at.least( 1 );
		} );

		it( 'should call `doChangeRecommendedIcon`', function () {
			var doChangeRecommendedIconSpy = sinon.spy( controller.doChangeRecommendedIcon );
			doChangeRecommendedIconSpy( SpiedObjInstance, SpiedObjInstance.model );
			doChangeRecommendedIconSpy.callCount.should.be.at.least( 1 );
		} );

		it( 'should call `doRemoveQueueByRecommended`', function () {
			var doRemoveQueueByRecommendedSpy = sinon.spy( controller.doRemoveQueueByRecommended );
			doRemoveQueueByRecommendedSpy( SpiedObjInstance, evt );
			doRemoveQueueByRecommendedSpy.callCount.should.be.at.least( 1 );
		} );

		it( 'should call `doViewTags`', function () {
			var doViewTagsSpy = sinon.spy( controller.doViewTags );
			doViewTagsSpy( SpiedObjInstance, evt );
			doViewTagsSpy.callCount.should.be.at.least( 1 );
		} );
	} );
} );
