define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!user/templates/eula/eulaTextLayout.html' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'eulaRegion' : '#eula-content'
		}

	} );

} );
