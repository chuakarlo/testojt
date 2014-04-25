define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!resources/templates/ResourcesItemView.html' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'tagName'   : 'li',
		'className' : 'col-xs-12 col-sm-4 col-md-2',

		'ui' : {
			'thereNow' : '#link-more-thereNow'

		},

		'onRender' : function () {
			// external link in new window for thereNow
			if ( this.model.attributes.id === 'link-more-thereNow' ) {
				this.ui.thereNow.attr( 'href', this.model.attributes.url );
				this.ui.thereNow.attr( 'target', '_blank' );
			}

		}

	} );

} );
