define( function ( require ) {
	'use strict';

	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var template       = require( 'text!../templates/groupHeaderView.html' );
	var utils          = require( 'groups/utils/utils' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),
		'class'    : 'header',
		'tagName'  : 'div',

		'templateHelpers' : {

			'getAvatarPath' : require( 'common/helpers/getAvatarPath' ),

			'getCleanName'  : function () {
				return utils.doubleUnescape( this.LicenseName );
			}

		}

	} );

} );
