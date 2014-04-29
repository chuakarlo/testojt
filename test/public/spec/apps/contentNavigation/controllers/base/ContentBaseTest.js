define( function ( require ) {
	'use strict';

	var assert            = require( 'chai' ).assert;
	var Base              = require( 'contentNavigation/controllers/base/ContentBase' );

	describe( 'CN-ContentBaseTest', function () {
		it( 'should have properties', function () {
			Base.should.have.property( 'Collections' );
			Base.should.have.property( 'Components' );
			Base.should.have.property( 'initializeCollection' );
			Base.should.have.property( '_initializeSegmentCollection' );
			Base.should.have.property( '_initializeUUVCollection' );
			Base.should.have.property( 'initializeComponent' );
			Base.should.have.property( 'initializeFetching' );
			Base.should.have.property( '_createVents' );
			Base.should.have.property( '_fetchCollection' );
			Base.should.have.property( '_purgeSegmentModels' );
			Base.should.have.property( '_setFetchedSegments' );
			Base.should.have.property( '_segmentFilter' );
			Base.should.have.property( '_getFiltersParam' );
			Base.should.have.property( '_segmentSort' );
			Base.should.have.property( '_setSortParam' );
			Base.should.have.property( '_fetchSegmentFailed' );
			Base.should.have.property( '_getStartingRow' );
			Base.should.have.property( 'getCollection' );
			Base.should.have.property( 'getView' );
			Base.should.have.property( 'cancelPendingCollectionFetch' );
			Base.should.have.property( 'fetchWhileScrolling' );
			Base.should.have.property( '_addSegmentsTopShadow' );
			Base.should.have.property( '_showLoadingIndicator' );
			Base.should.have.property( '_showNoMoreVideosIndicator' );
			Base.should.have.property( '_hideLoadingIndicators' );
		} );
		it( 'queryLimit should have limit of 24', function () {
			Base.queryLimit.should.be.equal( 24 );
		} );
		it( 'collectionRequest, collection, component, view, vent, fetchingSegments should be initially null', function () {
			assert.isNull( Base.collectionRequest );
			assert.isNull( Base.collection );
			assert.isNull( Base.component );
			assert.isNull( Base.view );
			assert.isNull( Base.vent );
			assert.isNull( Base.fetchingSegments );
		} );
		it( 'filterParam, and sortByParam should be initially an empty string', function () {
			Base.filterParam.should.be.equal( '' );
			Base.sortByParam.should.be.equal( '' );
		} );
	} );
} );