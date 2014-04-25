define( function ( require ) {
	'use strict';

	var ResourcesCollectionView = require( 'videoPlayer/views/tabs/VideoResourcesCollectionView' );
	var ResourcesCollection = require( 'videoPlayer/collections/VideoResourcesCollection' );
	
	describe( 'VideoResourcesCollectionView', function () {
		var resourcesView;
		var resources;
		var fakeData;

		before( function () {
			resources = new ResourcesCollection();
			fakeData = [
				{
					'url'          : '',
					'ContentName'  : '',
					'duration'     : '',
					'thumbnail'    : '',
					'downloadPath' : ''
				}
			];
			resources.reset( fakeData );


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