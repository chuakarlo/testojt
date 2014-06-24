define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template   = require( 'text!apps/homepage/utils/thumbnails/templates/thumbnailEmptyView.html' );

	return Marionette.ItemView.extend( {
		'initialize'      : function ( options ) {
			this.emptyMessage = options.emptyMessage;
		},
		'template'        : _.template( template ),
		'templateHelpers' : function () {
			return this.emptyMessage;
		},
		'onRender'        : function () {
			this.$el.find( 'p' ).html( this.emptyMessage.details );
		}
	} );

} );
