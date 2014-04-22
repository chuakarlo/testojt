define( function ( require ) {
	'use strict';

	var Marionette                   = require( 'marionette' );
	var _                            = require( 'underscore' );
	var template                     = require( 'text!apps/homepage/external/widgets/templates/widgetLayoutView.html' );

	return Marionette.Layout.extend( {
		'template' : _.template( template )

	} );

} );