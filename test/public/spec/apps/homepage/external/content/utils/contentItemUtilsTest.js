define( function ( require ) {
	'use strict';

	var _        = require('underscore');
	var sinon    = window.sinon;
	var Backbone = require( 'backbone' );

	var ItemView        = require( 'apps/homepage/external/content/views/ContentItemView' );
	var controller      = require( 'apps/homepage/external/content/utils/contentItemUtil' );
	var RecommendedBase = require( 'apps/homepage/external/content/external/recommended/base' );

	describe( 'contentItemUtil Test ', function () {

		var ItemViewInstance;
		var TestCollection;
		var TestEmptyCollection;

		var evt;

		before( function () {

			var data;
			evt = document.createEvent( 'Event' );

			TestCollection = new Backbone.Collection( [
				{
					'ContentId'              : 1234,
					'imageUrl'               : null,
					'ContentName'            : 'Sample Topic',
					'SegmentLengthInSeconds' : 1024,
					'renderToggle'           : function () {},
					'attributes'             : function () {
						return {
							'renderToggle' : RecommendedBase.renderToggle,
							'sharedData'   : data
						};
					}
				}
			] );

			TestEmptyCollection = new Backbone.Collection();

			ItemViewInstance = new ItemView( {
				'model'      : TestCollection.models[ 0 ],
				'collection' : TestCollection,
				'emptyView'  : '',
				'template'   : _.template('<div></div>')
			} );
			ItemViewInstance.render();
		} );

		it( 'should call `switchClass` function ', function () {
			var switchClassSpy = sinon.spy( controller.switchClass );
			switchClassSpy( evt );
			switchClassSpy.callCount.should.be.at.least(1);

		} );

		it( 'should call `addItemToQueue` function ', function () {
			var addItemToQueueSpy = sinon.spy( controller.addItemToQueue );
			addItemToQueueSpy( ItemViewInstance, evt );
			addItemToQueueSpy.callCount.should.be.at.least(1);
		} );

		it( 'should call `changeIconOnRemove` function ', function () {
			var changeIconOnRemoveSpy = sinon.spy( controller.changeIconOnRemove );
			changeIconOnRemoveSpy( ItemViewInstance );
			changeIconOnRemoveSpy.callCount.should.be.at.least(1);

		} );

		it( 'should call `switchRemove` function ', function () {
			var switchRemoveSpy = sinon.spy( controller.switchRemove );
			switchRemoveSpy( evt );
			switchRemoveSpy.callCount.should.be.at.least(1);

		} );

		it( 'should call `removeSuccess` function ', function () {
			// var switchRemoveSpy = sinon.spy( controller.removeSuccess );
			// switchRemoveSpy( ItemViewInstance, $(ItemViewInstance.template), 1);
			// expect( switchRemoveSpy ).to.have.been.calledOnce;
		} );

		it( 'should call `removeError` function ', function () {
			// var removeErrorSpy = sinon.spy( controller.removeError );
			// removeErrorSpy( $(ItemViewInstance.template) );
			// expect( removeErrorSpy ).to.have.been.calledOnce;
		} );

		it( 'should call `queueCheck` function ', function () {
			var queueCheckSpy = sinon.spy( controller.queueCheck );
			queueCheckSpy(ItemViewInstance, ItemViewInstance.model);
			queueCheckSpy.callCount.should.be.at.least(1);

		} );

	} );
} );
