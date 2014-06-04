define( function ( require ) {
	'use strict';

	var Backbone   = require( 'backbone' );
	var _          = require( 'underscore' );
	var template   = require( 'text!user/templates/settings/settings.html' );

	return Backbone.Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'nav'     : '#setting-nav',
			'content' : '#setting-content',
			'loading' : '#setting-loading'
		}

	} );

} );
