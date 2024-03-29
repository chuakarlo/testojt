define( function( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/footer/templates/footer.html' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'imageRegion' : '.footer-img-region'
		}

	} );
} );

