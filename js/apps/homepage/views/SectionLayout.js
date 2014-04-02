define( function ( require ) {
	'use strict';

	var _            = require( 'underscore' );
	var Marionette   = require( 'marionette' );

	var template     = require( 'text!apps/homepage/templates/sectionLayout.html' );

	var homeSelector = '#home';

	return Marionette.Layout.extend( {
		'template'   : _.template( template ),
		'regions'    : {
			'home' : homeSelector
		}
	} );

} );