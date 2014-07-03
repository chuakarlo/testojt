define( function ( require ) {
	'use strict';

	var $                          = require( 'jquery' );
	var _                          = require( 'underscore' );
	var App                        = require( 'App' );
	var thumbnailSlideNavsTemplate = require( 'text!apps/homepage/utils/thumbnails/templates/thumbnailSlideNavs.html' );

	function updateCount ( increment ) {
		var oldCount = App.request( 'homepage:content:queue:total' );
		$( '#your-queue-count' ).html( oldCount + increment );
		App.reqres.setHandler( 'homepage:content:queue:total', function () {
			return oldCount + increment;
		} );
	}

	function setNavButtons ( rows ) {
		if ( $( '#your-queue-pd360-slide-' + rows.contentSize + ' .carousel-control' ).length === 0 ) {
			var nav = _.template( thumbnailSlideNavsTemplate, {
				'contentId'   : rows.contentId,
				'contentSize' : rows.contentSize
			} );
			$( '#your-queue-pd360-slide-' + rows.contentSize + ' .carousel-inner-wrapper' ).append( nav );
			App.Homepage.Utils.carouselApplySettings( $( '#your-queue-pd360-slide-' + rows.contentSize + '.carousel' ) );
		}
	}

	function queueQueueModel ( rows, model ) {
		if ( rows.length !== 0 && rows.innerCollections.length !== 0 && rows.innerCollections[ rows.innerCollections.length - 1 ].length < rows.contentMax ) {
			rows.innerCollections[ rows.innerCollections.length - 1 ].add( model );
		} else {
			rows.add( App.Homepage.Utils.chunk( [ model ], rows.contentMax ) );
			setNavButtons( rows );
			App.Homepage.Utils.carouselHandleNavBars( $( '#your-queue-pd360-slide-' + rows.contentSize + '.carousel' ) );
		}
	}

	App.vent.on( 'common:queued', function ( model ) {
		App.Homepage.Utils.proceedHomeAction( function () {
			if ( App.reqres.hasHandler( 'homepage:content:your-queue:carousel' ) ) {
				App.request( 'homepage:content:your-queue:carousel' ).forEach( function ( rows ) {
					queueQueueModel( rows, model );
				} );
			}
			updateCount( 1 );
		} );
	} );
} );
