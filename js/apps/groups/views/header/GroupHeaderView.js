define( function ( require ) {
	'use strict';

	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var template       = require( 'text!groups/templates/header/groupHeaderView.html' );
	var utils          = require( 'groups/utils/utils' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),
		'class'    : 'header',
		'tagName'  : 'div',

		'bindings' : {
			'h2' : {
				'observe' : 'LicenseName',
				'onGet'   : function ( value ) {
					return utils.doubleUnescape( value );
				}
			}
		},

		'onRender' : function () {
			this.stickit();
		},

		'templateHelpers' : {

			'getAvatarPath' : require( 'common/helpers/getAvatarPath' )

		}

	} );

} );
