define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	return App.Common.SegmentCardsView.extend( {

		'className' : 'col-xs-12 col-sm-6 col-md-3 col-lg-3',

		'navigateToVideoPage' : function () {
			// The URL is already properly formatted for UUV, no need to
			// capture it in javascript
			return;
		}

	} );

} );
