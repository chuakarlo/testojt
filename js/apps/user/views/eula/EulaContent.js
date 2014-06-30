define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!user/templates/eula/eulaContent.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'ui' : {
			'privacyLinks' : '.js-privacy'
		},

		'onRender' : function () {
			var url = window.location.protocol + '//' + window.location.hostname;

			if ( window.location.port ) {
				url += ':' + window.location.port;
			}

			url	+= window.location.pathname + '#privacy';

			this.ui.privacyLinks.html( url );
		}

	} );

} );
