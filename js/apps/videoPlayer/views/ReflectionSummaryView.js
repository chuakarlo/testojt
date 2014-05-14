define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!videoPlayer/templates/reflectionSummary.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),

		'className' : 'right-bar',

		'initialize' : function ( options ) {
			options = options || { };
			_.extend( this, options );
		}

	} );

} );
