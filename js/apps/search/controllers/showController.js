define( function ( require ) {
	'use strict';

	var SearchResultsView = require( 'search/views/SearchResultsView' );
	var App               = require( 'App' );

	App.module( 'Search.Show', function ( Show ) {

		Show.Controller = {

			'showSearchResults' : function () {

				var searchResults = new SearchResultsView();
				App.content.show( searchResults );

			}

		};

	} );

} );
