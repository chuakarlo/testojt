define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var _          = require( 'underscore' );
	var App        = require( 'App' );

	var template                = require( 'text!apps/homepage/utils/thumbnails/templates/thumbnailLayoutView.html' );
	var ThumbnailCollectionView = require( 'apps/homepage/utils/thumbnails/views/ThumbnailCollectionView' );

	function slideNavsData ( id ) {
		return {
			'largeSlide'  : {
				'size' : 'lg'
			},
			'mediumSlide' : {
				'size' : 'md'
			},
			'smallSlide'  : {
				'size' : 'sm'
			},
			'xSmallSlide' : {
				'size' : 'xs'
			}
		};
	}

	function showAll ( view, region, collection, chunkSize ) {
		var thumbnailChunk      = App.Homepage.Utils.chunk( collection, chunkSize );
		var thumbnailCollection = new Backbone.Collection( thumbnailChunk );

		thumbnailCollection.contentId    = view.model.get( 'base' ).get( 'id' );
		thumbnailCollection.contentSize  = slideNavsData()[ region ].size;
		thumbnailCollection.EmptyMessage = view.model.get( 'base' ).get( 'EmptyMessage' );
		thumbnailCollection.modelSet     = view.model.get( 'base' ).get( 'modelSet' ) || function () {};
		view[ region ].show( new ThumbnailCollectionView( thumbnailCollection ) );
	}

	return Marionette.Layout.extend( {
		'initialize' : function () {
			var that = this;
			var id   = this.model.get( 'base' ).get( 'id' );
			var data = this.model.get( 'data' ).models;

			this.templateHelpers = {
				'id' : id
			};

			this.addRegion( 'largeSlide', '#' + id + '-pd360-slide-lg .carousel-inner-wrapper');
			this.addRegion( 'mediumSlide', '#' + id + '-pd360-slide-md .carousel-inner-wrapper');
			this.addRegion( 'smallSlide', '#' + id + '-pd360-slide-sm .carousel-inner-wrapper');
			this.addRegion( 'xSmallSlide', '#' + id + '-pd360-slide-xs .carousel-inner-wrapper');

			this.onRender = function () {
				// Show all thumbnails
				showAll( that, 'largeSlide', data, 4 );
				showAll( that, 'mediumSlide', data, 3 );
				showAll( that, 'smallSlide', data, 2 );
				showAll( that, 'xSmallSlide', data, 1 );
			};
		},
		'template'   : _.template( template )
	} );

} );
