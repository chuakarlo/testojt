define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template = require( 'text!share/templates/LumiBookTemplate.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'templateHelpers' : function () {
			return {
				'title' : this.options.title,
				'url'   : this.options.url
			};
		}

	} );

} );
