define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var template   = require( 'text!../templates/ColleagueItemView.html' );

	var SearchResultItemView = require( './SearchResultItemView' );

	return SearchResultItemView.extend( {

		'template'  : _.template( template ),

		'templateHelpers' : {
			'getConfig' : require( 'common/helpers/getConfig' )
		}

	} );
} );
