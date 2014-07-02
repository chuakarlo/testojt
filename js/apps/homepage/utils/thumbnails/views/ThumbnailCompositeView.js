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

			this.model.collection.innerCollections = this.model.collection.innerCollections || [ ];
			this.model.collection.innerCollections.push( this.collection );

			for ( var index = 0, length = this.collection.length; index < length; index++ ) {
				var model       = this.collection.models[ index ];
				var id          = model.get( 'ContentId' );
				var VideoTypeId = 1;

				if ( !id ) {
					id          = model.get( 'UUVideoId' );
					VideoTypeId = 2;
				}

				model.set( 'id', id );
				model.set( 'VideoTypeId', VideoTypeId );
				model.set( 'fromHomepage', true );
				options.modelSet( model );
			}
		},
		'className'         : 'item',
		'template'          : _.template( template ),
		'itemView'          : App.Common.SegmentCardsView,
		'itemViewContainer' : '.row',
		'onShow'            : function () {
			if ( this.model.collection.indexOf( this.model ) === 0 ) {
				this.$el.parent().find( '.item:first-child' ).addClass( 'active' );
			}
			$( '#load-recommended' ).empty();
		}
	} );

} );
