define( function ( require ) {
	'use strict';

	var $                          = require( 'jquery' );
	var _                          = require( 'underscore' );
	var App                        = require( 'App' );
	var thumbnailSlideNavsTemplate = require( 'text!apps/homepage/utils/thumbnails/templates/thumbnailSlideNavs.html' );

	function propagateCollection ( fetchedColl, allData ) {
		var innerFetchedColl = fetchedColl;
		if ( allData.contentMax !== 1 && allData.innerCollections ) {
			var last      = allData.innerCollections.slice( -1 )[ 0 ];
			var remaining = allData.contentMax - last.length;
			if ( remaining !== 0 ) {
				last.add( innerFetchedColl.slice( 0, remaining) );
				innerFetchedColl = innerFetchedColl.slice( remaining + 1 );
			}
		}
		allData.add( App.Homepage.Utils.chunk( innerFetchedColl, allData.contentMax ) );
		if ( allData.length > 1 && $( '#your-queue-pd360-slide-' + allData.contentSize + ' .carousel-control' ).length < 1 ) {
			var slideNavsTemplate = _.template( thumbnailSlideNavsTemplate, {
				'contentId'   : allData.contentId,
				'contentSize' : allData.contentSize
			} );
			$( '#your-queue-pd360-slide-' + allData.contentSize + ' .carousel-inner-wrapper' ).append( slideNavsTemplate );
			App.Homepage.Utils.carouselApplySettings( $( '#your-queue-pd360-slide-' + allData.contentSize + '.carousel' ) );
		}
	}

	function updateCount ( increment ) {
		var oldCount = App.request( 'homepage:content:queue:total' );
		$( '#your-queue-count' ).html( oldCount + increment );
		App.reqres.setHandler( 'homepage:content:queue:total', function () {
			return oldCount + increment;
		} );
	}

	App.vent.on( 'common:queued', function ( model ) {
		App.Homepage.Utils.proceedHomeAction( function () {
			if ( App.reqres.hasHandler( 'homepage:content:your-queue:carousel' ) ) {
				var allData = App.request( 'homepage:content:your-queue:carousel' );
				var newData = [ model.attributes ];
				propagateCollection ( newData, allData[ 0 ] );
				propagateCollection ( newData, allData[ 1 ] );
				propagateCollection ( newData, allData[ 2 ] );
				propagateCollection ( newData, allData[ 3 ] );

				updateCount( 1 );
			}
		} );
	} );

	App.vent.on( 'common:dequeued', function ( model ) {
		App.Homepage.Utils.proceedHomeAction( function () {
			if ( App.reqres.hasHandler( 'homepage:content:your-queue:carousel' ) ) {
				updateCount ( -1 );
			}
		} );
	} );

} );
