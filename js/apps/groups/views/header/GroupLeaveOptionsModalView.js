define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var template   = require( 'text!groups/templates/header/groupLeaveOptionsModalView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'className' : 'modal-dialog',

		'events' : {
			'click button.leave-option-yes' : 'leaveGroup'
		},

		'leaveGroup' : function ( e ) {

			e.preventDefault();
			Vent.trigger( 'group:leaveGroup', this.model );
		}

	} );

} );
