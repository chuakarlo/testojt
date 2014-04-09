define( function ( require ) {
	'use strict';

	// libraries
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	// templates
	var template    = require( 'text!videoPlayer/templates/share/selectedItemView.html' );
	var tooltipTmpl = require( 'text!videoPlayer/templates/share/selectedItemTooltip.html' );


	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'tagName' : 'span',

		'className' : 'selected-name',

		'ui' : {
			'removeItem'   : '.remove-item',
			'selectedItem' : '.selected-item',
		},

		'triggers' : {
			'click @ui.removeItem' : 'item:remove'
		},

		'onShow' : function () {
			var content = _.template( tooltipTmpl, this.model.attributes );

			this.ui.selectedItem.tooltip( {
				'animation' : false,
				'title'     : content,
				'container' : this.ui.selectedItem,
				'html'      : true
			} );
		}

	} );

} );
