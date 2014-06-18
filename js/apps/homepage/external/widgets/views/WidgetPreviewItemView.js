define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/widgets/templates/widgetPreviewItemView.html' );
	var App        = require('App');

	var message    = App.Homepage.Utils.message;

	function doSetTemplateHelpers ( view ) {
		var action    = view.getWidgetAction();
		var modelData = view.model;

		return {
			'closeName'    : message.closeName,
			'andCloseName' : message.andCloseName,
			'action'       : action,
			'imgSrc'       : modelData.get('imgSrc')(),
			'WidgetName'   : modelData.get('WidgetName')(),
			'Description'  : modelData.get('Description')(),
			'actionValue'  : action.toLowerCase().replace( /\b[a-z]/g, function ( letter ) {
				return letter.toUpperCase();
			} )
		};
	}

	return Marionette.ItemView.extend( {
		'ui' : {
			'actionBtn'      : '.action-btn',
			'actionCloseBtn' : '.action-close-btn',
			'widgetMessage'  : '#widget-limit-message'
		},
		'template'        : _.template( template ),
		'templateHelpers' : function () {
			return doSetTemplateHelpers( this );
		},

		'getWidgetAction' : function () {
			var widgetAction = '';
			if ( this.model ) {
				widgetAction =  'save';
			}
			return widgetAction;
		}
	} );

} );
