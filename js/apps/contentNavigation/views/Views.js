define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'ContentNavigation.Views', function ( Views ) {

		Views.PageLayout       = require( 'contentNavigation/views/ContentNavigationPageLayout' );
		Views.Libraries        = require( 'contentNavigation/views/ContentNavigationLibraries' );
		Views.Filters          = require( 'contentNavigation/views/ContentNavigationFilters' );
		Views.Segments         = require( 'contentNavigation/views/ContentNavigationSegments' );
		Views.SortBy           = require( 'contentNavigation/views/ContentNavigationSortBy' );
		Views.UUVCategories    = require( 'contentNavigation/views/ContentNavigationUUVCategories' );
		Views.CustomCategories = require( 'contentNavigation/views/ContentNavigationCustomCategories' );
		Views.EmptyCollection  = require( 'contentNavigation/views/ContentNavigationCollectionEmptyView' );
		Views.NoMoreVideos     = require( 'contentNavigation/views/ContentNavigationNoMoreVideosView' );

	} );

} );
