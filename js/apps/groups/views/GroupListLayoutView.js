define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var template   = require( 'text!../templates/groupListLayoutView.html' );

	return Marionette.Layout.extend( {

		'template'  : _.template( template ),

		'events'    : {
			'click a.create-own-group' : 'createGroupClicked'
		},

		'regions' : {
			'groupsRegion'       : '.groups',
			'groupInvitesRegion' : '.group-invites'
		},

		'createGroupClicked' : function () {
			Vent.trigger( 'group:showCreateGroup' );
		}

	} );

} );
