define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/what-to-do-next/external/whats-new/templates/widgetItemView.html' );

	return Marionette.ItemView.extend( {
		'template'        : _.template( template ),
		'className'       : 'col-md-12 no-padding whatsnew',
		'templateHelpers' : function () {
			return {
				'content' : this.limitCharacter( this.model.get( 'content' ) ),
				'url'     : this.model.get( 'url' ),
				'imgIcon' : this.model.get( 'imgIcon' )
			};
		},
		'limitCharacter' : function ( text ) {
			return ( text.length > 40 ) ? text.substr( 0, 40 ) + '...' : text;
		},
	} );
} );