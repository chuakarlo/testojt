define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var ThumbnailCompositeView     = require( 'apps/homepage/utils/thumbnails/views/ThumbnailCompositeView' );
	var ThumbnailEmptyView         = require( 'apps/homepage/utils/thumbnails/views/ThumbnailEmptyView' );
	var thumbnailSlideNavsTemplate = require( 'text!apps/homepage/utils/thumbnails/templates/thumbnailSlideNavs.html' );

	return Marionette.CollectionView.extend( {
		'initialize'      : function ( options ) {
			this.collection  = options;
			this.contentId   = options.contentId;
			this.contentSize = options.contentSize;
			this.collection.bind('add', this.onModelAdded, this);
		},
		'onModelAdded'    : function ( addedModel ) {
			console.log( 'modal fires' );
			console.log( addedModel );
		},
		'className'       : 'carousel-inner',
		'itemView'        : ThumbnailCompositeView,
		'itemViewOptions' : function () {
			return {
				'emptyMessage' : this.collection.EmptyMessage,
				'modelSet'     : this.collection.modelSet
			};
		},
		'emptyView'       : ThumbnailEmptyView,
		'onShow'          : function () {
			var slideNavsTemplate = _.template( thumbnailSlideNavsTemplate, {
				'contentId'   : this.contentId,
				'contentSize' : this.contentSize
			} );

			if ( this.collection.length && this.collection.length > 1 ) {
				this.$el.parent().append( slideNavsTemplate );
				App.Homepage.Utils.carouselApplySettings( this.$el.closest( '.carousel' ) );
			}
		}
	} );

} );
