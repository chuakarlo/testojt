define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var template   = require( 'text!../templates/groupCreateView.html' );

	return Marionette.CompositeView.extend( {

		'template'   : _.template( template ),

		'className'  : 'groups-create',

		'events'    : {
			'click button.cancel' : 'cancelCreateGroupClicked',
			'submit form'         : 'createGroupClicked'
		},

		'ui' : {
			'groupName'        : '#inputGroupName',
			'groupDescription' : '#inputGroupDescription',
			'groupPublic'      : '#setGroupPublic',
			'groupPrivate'     : '.radio',
			'groupVisibility'  : '#setGroupVisibility'
		},

		'createGroupClicked' : function ( e ) {
			// Insert Create Group Event Here
			var groupData = {
				'LicenseName'  : this.ui.groupName.val(),
				'Misc'         : this.ui.groupDescription.val(),
				'PrivateGroup' : this.ui.groupPrivate.find('input[name="optionsRadios"]:checked').val(),
				'Hidden'       : this.ui.groupVisibility.is(':checked')
			};

			if ( !( ( groupData.LicenseName === '' ) || ( groupData.Misc === '' ) ) ) {
				Vent.trigger( 'group:createGroup', groupData );
			}

			e.preventDefault();
		},

		'cancelCreateGroupClicked' : function () {
			Vent.trigger( 'group:listGroups' );
		}

	} );

} );
