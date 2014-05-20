define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var sinon = window.sinon;
	var expect = require( 'chai' ).expect;

	var $ = require( 'jquery' );
	var utils = require( 'apps/homepage/external/content/utils/contentItemUtil' );
	var controller = require( 'apps/homepage/external/content/controllers/contentItemController' );
	var ItemView = require( 'apps/homepage/external/content/views/ContentItemView' );


	describe( 'contentItemController ', function () {
		var SpiedObjInstance;
		var ItemViewInstance;
		var TestCollection;

		before( function () {
			TestCollection = new Backbone.Collection( [
				{
					'ContentId': 1234,
					'imageUrl': null,
					'ContentName': 'Sample Topic',
					'SegmentLengthInSeconds': 1024,
					'renderToggle': function () {},
					'Tags': true
				}
			] );

			SpiedObjInstance = new ItemView( {
				model: TestCollection.models[ 0 ]
			} );
			SpiedObjInstance.render();
		} );

		it( 'should call `doAddtoMyQueue`', function () {
			var evt = document.createEvent( 'Event' );

			var selectedStub = sinon.stub( utils, 'switchRemove' );
			var selectedStub2 = sinon.stub( utils, 'addItemToQueue' );

			controller.doAddtoMyQueue( SpiedObjInstance, evt );

		} );

		it( 'should call `doEnableTooltip`', function () {
			var evt = document.createEvent( 'Event' );
			controller.doEnableTooltip( evt );

		} );

		it( 'should call `doRemoveFromQueue`', function () {
			var evt = document.createEvent( 'Event' );
			controller.doRemoveFromQueue( SpiedObjInstance, evt );

		} );


		it( 'should call `doChangeRecommendedIcon`', function () {
			var evt = document.createEvent( 'Event' );
			controller.doChangeRecommendedIcon( SpiedObjInstance, SpiedObjInstance.model );

		} );

		it( 'should call `doRemoveQueueByRecommended`', function () {
			var evt = document.createEvent( 'Event' );

			controller.doRemoveQueueByRecommended( SpiedObjInstance, evt );

		} );

		it( 'should call `doViewTags`', function () {
			var evt = document.createEvent( 'Event' );
			controller.doViewTags( SpiedObjInstance, evt );

		} );
	} );

} );