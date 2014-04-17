define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var template   = require( 'text!../templates/groupSubNavView.html' );

	return Marionette.ItemView.extend( {

		'template'          : _.template( template ),

		'events' : {
			'click a#tab-forums' : 'navigateForums'

	    },

		'navigateForums' : function( event ) {
			// This doesn't belong here
			event.preventDefault();

			App.request( 'group:showForums', this.model.attributes.LicenseId );

		}

	} );

} );
