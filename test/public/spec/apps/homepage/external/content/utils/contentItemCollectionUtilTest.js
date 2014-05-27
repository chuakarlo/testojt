define( function ( require ) {
	'use strict';

	var _        = require('underscore');
	var sinon    = window.sinon;
	var Backbone = require( 'backbone' );
	var Marionette      = require( 'marionette' );

	var utils = require( 'apps/homepage/external/content/utils/contentItemCollectionUtil' );
	var RecommendedBase = require( 'apps/homepage/external/content/external/recommended/base' );
	var ItemCollectionView = require( 'apps/homepage/external/content/views/ContentItemCollectionView' );

	describe( 'contentItemCollectionUtil Test', function () {

		var ItemViewInstance;
		var TestCollection;
		var TestEmptyCollection;
		var data;

		before( function () {

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

		it( 'should call doError', function () {
			var doErrorSpy = sinon.spy( utils.doError );
			doErrorSpy( 'message' );
			doErrorSpy.callCount.should.be.at.least( 1 );
		} );

		it( 'should call doInfo', function () {
			var doInfoSpy = sinon.spy( utils.doInfo );
			doInfoSpy( 'message' );
			doInfoSpy.callCount.should.be.at.least( 1 );
		} );

		it( 'should call removeQueueByRecommendedSuccess', function () {
			var removeQueueByRecommendedSuccessSpy = sinon.spy( utils.removeQueueByRecommendedSuccess );
			removeQueueByRecommendedSuccessSpy( ItemViewInstance, ItemViewInstance );
			removeQueueByRecommendedSuccessSpy.callCount.should.be.at.least( 1 );
		} );

		it( 'should call collectionFetch', function () {
			var collectionFetchSpy = sinon.spy( utils.collectionFetch );
			collectionFetchSpy( ItemViewInstance, RecommendedBase, TestCollection, data, function () {} );
			collectionFetchSpy.callCount.should.be.at.least( 1 );
		} );

		it( 'should call processFetchedCollection', function () {
			var processFetchedCollectionSpy = sinon.spy( utils.processFetchedCollection );
			processFetchedCollectionSpy( ItemViewInstance, RecommendedBase, ItemViewInstance, data );
			processFetchedCollectionSpy.callCount.should.be.at.least( 1 );
		} );

	} );
} );
