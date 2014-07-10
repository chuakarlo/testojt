define( function ( require ) {
	'use strict';

	var App                        = require( 'App' );
	var Marionette                 = require( 'marionette' );
	var $                          = require( 'jquery' );
	var _                          = require( 'underscore' );
	var ThumbnailCompositeView     = require( 'apps/homepage/utils/thumbnails/views/ThumbnailCompositeView' );
	var ThumbnailEmptyView         = require( 'apps/homepage/utils/thumbnails/views/ThumbnailEmptyView' );
	var thumbnailSlideNavsTemplate = require( 'text!apps/homepage/utils/thumbnails/templates/thumbnailSlideNavs.html' );

	return Marionette.CollectionView.extend( {
		'initialize'      : function ( options ) {
			this.collection      = options;
			this.contentId       = options.contentId;
			this.contentSize     = options.contentSize;
			this.onLastNav       = options.onLastNav;
			this.contentMax      = options.contentMax;
			this.contentMaxWidth = options.contentMaxWidth;

		},
		'className'       : 'carousel-inner',
		'itemView'        : ThumbnailCompositeView,
		'itemViewOptions' : function () {
			return {
				'emptyMessage'    : this.collection.EmptyMessage,
				'modelSet'        : this.collection.modelSet,
				'parentContainer' : this.$el
			};
		},
		'emptyView'       : ThumbnailEmptyView,
		'onShow'          : function () {
			//calculate partial for first load
			var $carousel = this.$el.closest( '.carousel' );
			$carousel.data( { 'size' : this.contentMax } );
			if ( !$( 'html' ).hasClass( 'touch' ) ) {
				var slideNavsTemplate = _.template( thumbnailSlideNavsTemplate, {
					'contentId'   : this.contentId,
					'contentSize' : this.contentSize
				} );

				this.$el.parent().append( slideNavsTemplate );
			}
			App.Homepage.Utils.carouselApplySettings( $carousel , { 'onLastNav' : this.onLastNav } );
		}
	} );

} );
