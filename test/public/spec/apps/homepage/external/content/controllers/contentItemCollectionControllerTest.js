define( function ( require ) {
	'use strict';

	var Backbone           = require( 'backbone' );
	var Marionette         = require( 'marionette' );
	var sinon              = window.sinon;
	var _                  = require( 'underscore' );
	var UIManager          = require( 'apps/homepage/external/content/external/agents/UIManager' );
	var controller         = require( 'apps/homepage/external/content/controllers/contentItemCollectionController' );
	var ItemCollectionView = require( 'apps/homepage/external/content/views/ContentItemCollectionView' );

	var RecommendedBase = require( 'apps/homepage/external/content/external/recommended/base' );

	describe( 'contentItemCollectionController Test', function () {

		var ItemViewInstance;
		var TestCollection;
		var TestEmptyCollection;

		var getPreFetchLogicStub;
		var applyCircularScrollStub;

		before( function () {

			getPreFetchLogicStub = sinon.stub( RecommendedBase, 'getPreFetchLogic' );
			applyCircularScrollStub = sinon.stub( UIManager, 'applyCircularScroll' );

			TestCollection = new Backbone.Collection( [
				{
					'ContentId'              : 1234,
					'imageUrl'               : null,
					'ContentName'            : 'Sample Topic',
					'SegmentLengthInSeconds' : 1024,
					'renderToggle'           : function () {},
					'baseObject'             : RecommendedBase
				}
			] );

			TestEmptyCollection = new Backbone.Collection();

			var ItemView = Marionette.ItemView.extend( {
				'template' : _.template( '<div> ItemView </div>' )
			} );

			var ParentView = Marionette.ItemView.extend( {
				'template' : _.template( '<span class="count"> ItemView </span>' )
			} );

			var parentView = new ParentView();
			parentView.render();
			ItemViewInstance = new ItemCollectionView( {
				'model'      : TestCollection.models[ 0 ],
				'collection' : TestCollection,
				'itemView'   : ItemView,
				'parentView' : parentView
			} );

			ItemViewInstance.render();

		} );

		after( function () {
			RecommendedBase.getPreFetchLogic.restore();
			UIManager.applyCircularScroll.restore();
		} );

		it( 'should call `doInitialize` ', function () {
			controller.doInitialize( ItemViewInstance );
			getPreFetchLogicStub.callCount.should.be.at.least( 1 );
		} );

		it( 'should call doChangeRecommendedIcons', function () {
			var doChangeRecommendedIconsSpy = sinon.spy( controller.doChangeRecommendedIcons );
			doChangeRecommendedIconsSpy( ItemViewInstance );
			doChangeRecommendedIconsSpy.callCount.should.be.at.least( 1 );
		} );

		it( 'should call doAddToMyQueue', function () {
			controller.doAddToMyQueue( ItemViewInstance, TestCollection );
			applyCircularScrollStub.callCount.should.be.at.least( 1 );
		} );

		it( 'should call doReRenderView', function () {
			var doReRenderViewSpy = sinon.spy( controller.doReRenderView );
			doReRenderViewSpy( ItemViewInstance );
			doReRenderViewSpy.callCount.should.be.at.least(1);
		} );

		it( 'should call doRemoveQueueByRecommended', function () {
			var doRemoveQueueByRecommendedSpy = sinon.spy( controller.doRemoveQueueByRecommended );
			doRemoveQueueByRecommendedSpy( ItemViewInstance, ItemViewInstance );
			doRemoveQueueByRecommendedSpy.callCount.should.be.at.least(1);
		} );

	} );
} );
