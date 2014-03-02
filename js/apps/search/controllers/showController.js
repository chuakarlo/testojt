define( function ( require ) {
	'use strict';

	var Vent              = require( 'Vent' );
	var SearchResultsView = require( 'search/views/SearchResultsView' );

	return function ( Show, App ) {

		Show.Controller = {

			'showSearchResults' : function () {

				var searchResults = new SearchResultsView();
				App.content.show( searchResults );

			}

		};

	};

} );
