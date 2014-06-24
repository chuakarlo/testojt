define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var App        = require( 'App' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var template   = require( 'text!apps/homepage/utils/thumbnails/templates/thumbnailCompositeView.html' );

	function convert ( obj ) {
		return $.map( obj, function ( value, index ) {
			return [ value ];
		} );
	}

	return Marionette.CompositeView.extend( {
		'initialize'        : function ( options ) {
			var newData     = convert( this.model.attributes );
			this.collection = new Backbone.Collection( newData );

			for ( var index = 0, length = this.collection.length; index < length; index++ ) {
				var model = this.collection.models[ index ];
				model.set( 'id', model.get( 'ContentId' ) || model.get( 'UUVideoId' ) );
				model.set( 'fromHomepage', true );
				options.modelSet( model );
			}
		},
		'className'         : 'item',
		'template'          : _.template( template ),
		'itemView'          : App.Common.SegmentCardsView,
		'itemViewContainer' : '.row',
		'onShow'            : function () {
			this.$el.parent().find( '.item:first-child' ).addClass( 'active' );
		}
	} );

} );
