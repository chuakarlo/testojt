// Sample Modal view
define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/PersonnelModal.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'className' : 'modal-dialog modal-personnel',

		'templateHelpers' : {

			'BuildAvatar' : function () {
				var getUserAvatarPath = require( 'common/helpers/getUserAvatarPath' );

				return getUserAvatarPath( this.Avatar );
			}

		}
	} );

} );
