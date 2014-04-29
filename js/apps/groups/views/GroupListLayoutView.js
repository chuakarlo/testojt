define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/groupListLayoutView.html' );

	return Marionette.Layout.extend( {

		'template'  : _.template( template ),

		'regions' : {

			'groupInvitesRegion'  : '.group-invites',
			'groupsRegion'        : '.groups'

		}

	} );

} );
