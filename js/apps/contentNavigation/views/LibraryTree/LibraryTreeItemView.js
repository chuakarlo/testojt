define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!../../templates/LibraryTree/LibraryTreeItemViewTemplate.html' );

	return Marionette.ItemView.extend( {
		'tagName'	: 'li',
		'template'  : _.template( template ),
		'className'	: 'filter-item',

		'onRender' : function () {
			var isFirstCategory = this.model.get( 'firstCategory' );

			if( isFirstCategory ) {
				this.$el.addClass( 'addHighlight' );
			}
		}
	} );
} );