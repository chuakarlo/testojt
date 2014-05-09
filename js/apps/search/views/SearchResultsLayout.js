define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!search/templates/searchResultsLayout.html' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions'  : {
			'nav'     : '#search-result-nav',
			'results' : '#search-result-region',
			'loading' : '#search-result-loading'
		},

		'ui' : {
			'query' : '#search-query'
		}

	} );

} );
