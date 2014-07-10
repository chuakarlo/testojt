define( function ( require ) {
	'use strict';

	var $   = require( 'jquery' );
	var App = require( 'App' );

	var modernizr  = window.Modernizr;

	function updateCount ( increment ) {
		var oldCount = App.request( 'homepage:content:queue:total' );
		$( '#your-queue-count' ).html( oldCount + increment );
		App.reqres.setHandler( 'homepage:content:queue:total', function () {
			return oldCount + increment;
		} );
	}

	var emptyMod = {
		'set' : function () { }
	};

	function matchedSegmentsToQueue ( view ) {
		view.bindUIElements();
		if ( !modernizr.touch ) {
			var watch = view.$el.find( 'span.sc-watch-later-icon' );
			watch.tooltip( 'hide' )
				.attr( 'data-original-title', 'Add to Queue' )
				.tooltip( 'fixTitle' )
				.tooltip( 'show' );
		}
	}

	function deQueueMod ( mod ) {
		mod = mod ? mod : emptyMod;
		mod.set( { 'queued' : false } );
		if ( mod && mod._events && mod._events[ 'change:queued' ] ) {
			matchedSegmentsToQueue( mod._events[ 'change:queued' ][ 0 ].context );
			matchedSegmentsToQueue( mod._events[ 'change:queued' ][ 1 ].context );
			matchedSegmentsToQueue( mod._events[ 'change:queued' ][ 2 ].context );
			matchedSegmentsToQueue( mod._events[ 'change:queued' ][ 3 ].context );
		}
	}

	function dequeueRecommendedModel ( rows, model ) {
		var id     = model.get( 'id' );
		var length = rows.innerCollections.length;
		var index  = 0;
		var mod    = false;
		while ( index < length && !mod ) {
			mod = rows.innerCollections[ index ].get( id );
			index++;
		}
		deQueueMod( mod );
	}

	function getLastPosition ( rows, length, id ) {
		var index    = 0;
		while ( index < length && !rows.innerCollections[ index ].get( id ) ) {
			index ++;
		}
		return index;
	}

	function pushLastPosition ( rows, index ) {
		while ( rows.innerCollections[ index + 1 ] ) {
			var firstModel = rows.innerCollections[ index + 1 ].at( 0 );
			rows.innerCollections[ index ].add( firstModel );
			rows.innerCollections[ index + 1 ].remove( firstModel );
			index += 1;
		}
		return index;
	}

	function removeContainer ( rows, index ) {
		if ( rows.innerCollections[ index ].length === 0 ) {
			var sViewPort  = App.Homepage.Utils.getActiveView();
			var $carousel  = $( '#your-queue-pd360-slide-' + sViewPort + '.carousel' );
			var bHasActive = $carousel.find( '.item' ).hasClass( 'active' );
			rows.remove( rows.at( index ) );
			rows.innerCollections.splice( index, 1 );
			setActive ( $carousel, bHasActive );
		}
	}

	function setActive ( $carousel, bHasActive ) {
		if ( bHasActive ) {
			$carousel.find( '.item:last' ).addClass( 'active' );
		}
	}

	function dequeueQueueModel ( rows, model ) {
		var id     = model.get( 'id' );
		var length = rows.innerCollections.length;
		var index  = getLastPosition( rows, length, id );

		rows.innerCollections[ index ].remove( model );
		index = pushLastPosition( rows, index );
		removeContainer( rows, index );

		var sViewPort = App.Homepage.Utils.getActiveView();
		App.Homepage.Utils.carouselHandleNavBars( $( '#your-queue-pd360-slide-' + sViewPort + '.carousel' ) );
		App.Homepage.Utils.onRemoveItem( $( '#your-queue-pd360-slide-' + sViewPort + '.carousel' ) );
	}

	function setRecommendedQueue ( model ) {
		if ( App.reqres.hasHandler( 'homepage:content:recommended:carousel' ) ) {
			App.request( 'homepage:content:recommended:carousel' ).forEach( function ( rows ) {
				dequeueRecommendedModel( rows, model );
			} );
		}
	}

	function setYourQueueQueue ( model ) {
		if ( App.reqres.hasHandler( 'homepage:content:your-queue:carousel' ) ) {
			App.request( 'homepage:content:your-queue:carousel' ).forEach( function ( rows ) {
				dequeueQueueModel( rows, model );
			} );
		}
	}

	App.vent.on( 'common:dequeued', function ( model ) {
		App.Homepage.Utils.proceedHomeAction( function () {
			setRecommendedQueue( model );
			setYourQueueQueue( model );
			updateCount ( -1 );
		} );
	} );

} );
