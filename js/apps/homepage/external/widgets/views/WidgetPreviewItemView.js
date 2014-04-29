define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/widgets/templates/widgetPreviewItemView.html' );

	function doSetTemplateHelpers ( view ) {
		var action    = view.getWidgetAction();
		var modelData = view.model;

		return {
			'action'      : action,
			'imgSrc'      : modelData.get('imgSrc')(),
			'WidgetName'  : modelData.get('WidgetName')(),
			'Description' : modelData.get('Description')(),
			'actionValue' : action.toLowerCase().replace( /\b[a-z]/g, function ( letter ) {
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
			return this.options.userWidgetCollection.get( this.model.get( 'WidgetId' ) ) ? 'remove' : 'save';
		}
	} );

} );
