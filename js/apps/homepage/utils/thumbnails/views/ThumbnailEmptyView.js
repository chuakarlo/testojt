define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/utils/thumbnails/templates/thumbnailEmptyView.html' );

	return Marionette.ItemView.extend( {
		'initialize'      : function ( options ) {
			this.emptyMessage    = options.emptyMessage;
			this.parentContainer = options.parentContainer;
		},
		'template'        : _.template( template ),
		'templateHelpers' : function () {
			return this.emptyMessage;
		},
		'onRender'        : function () {
			this.parentContainer.swipe( 'destroy' );
			this.parentContainer.css( { 'width' : '100%' } );
			this.$el.find( 'p' ).html( this.emptyMessage.details );
		}
	} );

} );
