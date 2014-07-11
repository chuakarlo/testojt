define( function ( require ) {
	'use strict';

	var _               = require( 'underscore' );
	var Marionette      = require( 'marionette' );
	var template        = require( 'text!../templates/groupsItemView.html' );
	var getAbbreviation = require( 'common/helpers/getAbbreviation' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'tagName'   : 'li',
		'className' : 'col-xs-12 col-sm-6 col-md-4 col-lg-3',

		'templateHelpers' : {

			'getCleanAbbreviation' : function () {
				return getAbbreviation( _.unescape( this.LicenseName ), 28 ) ;
			},

			'getAvatarPath'   : require( 'common/helpers/getAvatarPath' ),
			'getBrandingPath' : require( 'common/helpers/getBrandingPath' )

		}

	} );

} );
