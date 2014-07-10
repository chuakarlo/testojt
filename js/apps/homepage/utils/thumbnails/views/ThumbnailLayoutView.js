define( function ( require ) {
	'use strict';

	var Marionette              = require( 'marionette' );
	var Backbone                = require( 'backbone' );
	var _                       = require( 'underscore' );
	var App                     = require( 'App' );
	var $                       = require( 'jquery' );

	var template                = require( 'text!apps/homepage/utils/thumbnails/templates/thumbnailLayoutView.html' );
	var ThumbnailCollectionView = require( 'apps/homepage/utils/thumbnails/views/ThumbnailCollectionView' );

	var slideNavsData = {
		'largeSlide'  : {
			'size'     : 'lg',
			'max'      : 4,
			'maxWidth' : 1140
		},
		'mediumSlide' : {
			'size'     : 'md',
			'max'      : 4,
			'maxWidth' : 1140
		},
		'smallSlide'  : {
			'size'     : 'sm',
			'max'      : 3,
			'maxWidth' : 885
		},
		'xSmallSlide' : {
			'size'     : 'xs',
			'max'      : 2,
			'maxWidth' : 570
		}
	};

	function fetchFunction ( target, source, key ) {
		target[ key ] = source.get( key ) || function () {};
	}

	function passtThrough ( obj ) {
		return obj;
	}

	function showAll ( view, region, collection ) {
		var thumbnailChunk      = App.Homepage.Utils.chunk( collection, slideNavsData[ region ].max );
		var thumbnailCollection = new Backbone.Collection( thumbnailChunk );
		var source = view.model.get( 'base' );

		thumbnailCollection.contentId       = source.get( 'id' );
		thumbnailCollection.contentSize     = slideNavsData[ region ].size;
		thumbnailCollection.contentMax      = slideNavsData[ region ].max;
		thumbnailCollection.contentMaxWidth = slideNavsData[ region ].maxWidth;
		thumbnailCollection.EmptyMessage    = source.get( 'EmptyMessage' );
		thumbnailCollection.onLastNav       = source.get( 'onLastNav' ) || function () {};

		fetchFunction( thumbnailCollection, source, 'modelSet' );

		var itemView = new ThumbnailCollectionView( thumbnailCollection );
		view[ region ].show( itemView );
		view.processedData.push( itemView.collection );
	}

	return Marionette.Layout.extend( {
		'initialize' : function () {
			var that = this;
			var base = this.model.get( 'base' );
			var data = this.model.get( 'data' ).models;

			var id         = base.get( 'id' );
			var fetchLogic = base.get( 'fetchLogic' ) || passtThrough;

			data = fetchLogic( data );

			fetchFunction( this, base, 'afterRender' );

			this.templateHelpers = {
				'id' : id
			};
			this.processedData = [ ];

			this.addRegion( 'largeSlide', '#' + id + '-pd360-slide-lg .carousel-inner-wrapper' );
			this.addRegion( 'mediumSlide', '#' + id + '-pd360-slide-md .carousel-inner-wrapper' );
			this.addRegion( 'smallSlide', '#' + id + '-pd360-slide-sm .carousel-inner-wrapper' );
			this.addRegion( 'xSmallSlide', '#' + id + '-pd360-slide-xs .carousel-inner-wrapper' );

			this.onRender = function () {
				// Show all thumbnails
				showAll( that, 'largeSlide', data );
				showAll( that, 'mediumSlide', data );
				showAll( that, 'smallSlide', data );
				showAll( that, 'xSmallSlide', data );

				App.reqres.setHandler( 'homepage:content:' + id + ':carousel', function () {
					return that.processedData;
				} );

				that.afterRender( that.processedData );
			};
		},
		'template'   : _.template( template ),
		'events'     : {
			'click .right.carousel-control' : function ( event ) {
				var target    = ( event.currentTarget ) ? event.currentTarget : event.srcElement;
				var $carousel = $( target ).closest( '.carousel' );
				App.Homepage.Utils.adjustOnLastItem( $carousel );
			},
			'click .left.carousel-control'  : function ( event ) {
				var target    = ( event.currentTarget ) ? event.currentTarget : event.srcElement;
				var $carousel = $( target ).closest( '.carousel' );
				App.Homepage.Utils.adjustOnFirstItem( $carousel );
			}
		}
	} );

} );
