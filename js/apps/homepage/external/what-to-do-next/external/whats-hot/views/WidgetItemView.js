define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/what-to-do-next/external/whats-hot/templates/widgetItemView.html' );

	return Marionette.ItemView.extend( {
		'template'        : _.template( template ),
		'className'       : 'item whatshot',
		'templateHelpers' : function () {
			return {
				'content' : this.limitCharacter( this.model.get( 'title' ) ),
				'url'     : this.model.get( 'url' ),
				'imgUrl'  : this.model.get( 'imgUrl' )
			};
		},
		'limitCharacter' : function ( text ) {
			return ( text.length > 40 ) ? text.substr( 0, 40 ) + '...' : text;
		},
	} );
} );