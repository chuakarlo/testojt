define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!groups/templates/overview/groupListLayoutView.html' );

	return Marionette.Layout.extend( {

		'template'  : _.template( template ),

		'regions' : {
			'groupsRegion'       : '.groupSection',
			'groupInvitesRegion' : '.group-invites'
		}

	} );

} );
