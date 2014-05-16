define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/groupsItemView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'tagName'   : 'li',
		'className' : 'col-xs-12 col-sm-6 col-md-4 col-lg-3',

		'templateHelpers' : {

			'getAbbreviation' : require( 'common/helpers/getAbbreviation' ),
			'getAvatarPath'   : require( '../helpers/getAvatarPath' ),
			'getBrandingPath' : require( '../helpers/getBrandingPath' )

		}

	} );

} );
