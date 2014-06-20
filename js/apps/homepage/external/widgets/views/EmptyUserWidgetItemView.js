define( function ( require ) {
	'use strict';

	var App        = require('App');
	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/widgets/templates/emptyWidgetItemView.html' );

	return Marionette.ItemView.extend( {
		'tagName'         : 'li',
		'template'        : _.template( template ),
		'className'       : 'widget-specific widget-placeholder-wrapper',
		'templateHelpers' : function () {
			return {
				'emptyMsg'    : App.Homepage.Utils.message.emptyMsg,
				'makeUseMsg1' : App.Homepage.Utils.message.makeUseMsg1,
				'makeUseMsg2' : App.Homepage.Utils.message.makeUseMsg2
			};
		}
	} );
} );
