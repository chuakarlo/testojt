define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!user/templates/privacy/privacyView.html' );

	require( 'validation' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'ui' : {
			'eulaLinks' : '.js-eula'
		},

		'onRender' : function () {
			var url = window.location.protocol + '//' + window.location.hostname;

			if ( window.location.port ) {
				url += ':' + window.location.port;
			}

			url	+= window.location.pathname + '#eula-full';

			this.ui.eulaLinks.html( url );
		}

	} );

} );
