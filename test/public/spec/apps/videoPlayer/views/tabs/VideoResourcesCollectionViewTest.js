define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	var ResourcesCollectionView = require( 'videoPlayer/views/tabs/VideoResourcesCollectionView' );

	describe( 'VideoResourcesCollectionView', function () {
		var resourcesView;
		var resources;
		var fakeData;

		before( function () {
			fakeData = [
				{
					'url'          : '',
					'ContentName'  : '',
					'duration'     : '',
					'thumbnail'    : '',
					'downloadPath' : ''
				}
			];
			resources = new Backbone.Collection( fakeData );

			resourcesView = new ResourcesCollectionView( {
				'collection' : resources
			} );
			resourcesView.render();
		} );

		after( function () {
			resourcesView = null;
		} );

		it( 'should clear collection on close', function () {
			resourcesView.close();
			resourcesView.collection.length.should.be.equal( 0 );
		} );

	} );
} );
