define( function ( require ) {
	'use strict';

	var App        = require('App');
	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/widgets/templates/emptyWidgetItemView.html' );

	var message    = App.Homepage.Utils.message;

	return Marionette.ItemView.extend( {
		'tagName'         : 'li',
		'template'        : _.template( template ),
		'className'       : 'widget-specific widget-placeholder-wrapper',
		'templateHelpers' : function () {
			return {
				'emptyMsg'    : message.emptyMsg,
				'makeUseMsg1' : message.makeUseMsg1,
				'makeUseMsg2' : message.makeUseMsg2
			};
		}
	} );
} );
