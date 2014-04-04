define( function ( require ) {
	'use strict';

	var $ = require( 'jquery' );

	var SearchResultsCollectionView = require( 'videoPlayer/views/share/SearchResultsCollectionView' );
	var ItemView                    = require( 'videoPlayer/views/share/SearchResultItemView' );
	var NoItemView                  = require( 'videoPlayer/views/NoItemView' );

	var searchResultsCollectionView;

	describe( 'SearchResultsCollectionView ItemView', function () {
		before(function () {
			searchResultsCollectionView = new SearchResultsCollectionView();
		} );

		it( 'should be an instance of `SearchResultsCollectionView`', function () {
			searchResultsCollectionView.should.be.instanceof( SearchResultsCollectionView );
		} );

		it( 'should have a `tagName` property', function () {
			searchResultsCollectionView.should.have.property( 'tagName' );
		} );

		it( 'should have a `className` property', function () {
			searchResultsCollectionView.should.have.property( 'className' );
		} );

		it( 'should have a `itemView` object property', function () {
			searchResultsCollectionView.should.have.property( 'itemView' );
		} );

		it( 'should have a `emptyView` property', function () {
			searchResultsCollectionView.should.have.property( 'emptyView' );
		} );

		it( 'should should bind `click` event to document body', function () {
			var bodyEvents = $._data( $('body')[0], 'events' );
			bodyEvents.click.should.not.be.undefined;
		} );

		describe( 'SearchResultsCollectionView `tagName` property', function () {
			it( 'should have a value equal to `ul`', function () {
				searchResultsCollectionView.tagName.should.eql( 'ul' );
			} );
		} );

		describe( 'SearchResultsCollectionView `className` property', function () {
			it( 'should have a value equal to `search-ac`', function () {
				searchResultsCollectionView.className.should.eql( 'search-ac' );
			} );
		} );

		describe( 'SearchResultsCollectionView `itemView` property', function () {
			it( 'should be equal to the item view passed in', function () {
				searchResultsCollectionView.itemView.should.eql( ItemView );
			} );
		} );

		describe( 'SearchResultsCollectionView `emptyView` property', function () {
			it( 'should be equal to the empty view passed in', function () {
				searchResultsCollectionView.emptyView.should.eql( NoItemView );
			} );
		} );

	} );

} );
