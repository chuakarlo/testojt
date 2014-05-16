define( function ( require ) {
	'use strict';

	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var template       = require( 'text!../templates/groupHeaderView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),
		'class'    : 'header',
		'tagName'  : 'div',

		'templateHelpers' : {

			'getAvatarPath' : require( 'common/helpers/getAvatarPath' )

		}

	} );

} );
