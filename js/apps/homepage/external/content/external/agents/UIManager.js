/**
 * UIManager
 * @class
 * Common UI manipulations across Content Section
 */
define( function ( require ) {
	'use strict';

	var $         = require( 'jquery' );
	var modernizr = window.Modernizr;

	var ITEMS_SHOWN_PER_PANE = 4;

	var UIManager = function () {};

	function doApplyCircularScroll ( container, appendToID, view, base, count ) {
		var autoRotate = false;

		var collLength = function () {
			if ( view ) {
				return ( count === view.collection.length - 1 );
			}
			return false;
		};

		var rotate = ( appendToID === 'your-queue' ) || collLength() ;
		require( [ 'pc-carouselSnap' ], function ( $ ) {
			$( container ).carouselSnap( {
				nextID                : 'next-slide-' + appendToID,
				prevID                : 'previous-slide-' + appendToID,
				elementsToMoveOnClick : ITEMS_SHOWN_PER_PANE,
				elementsToMoveOnHover : ITEMS_SHOWN_PER_PANE,
				startOnCenter         : false,
				rotate                : rotate,
				beforeShift           : function () {
					if ( view.collection.length && count === view.collection.length - 1 && !autoRotate ) {
						view.$el.carouselRotate( true, function ( res, msg ) {
							autoRotate = res;
						} );
					}
				},
				afterShift            : function () {
					$( container ).find( '.active-view .sc-segment-image-container .sc-play-link' ).each( function ( ) {
						var hovered = $( this ).is( ':hover' );
						if ( hovered ) {
							$( this ).closest( 'li' );
						}
					} );
				},
				afterClone            : function () {
					$( container ).currentClonedItem( function ( item ) {

						$( '.cloned-item span.sc-info-icon' ).off( 'click' ).on( 'click', function ( e ) {
							showDetails( e );
						} );

					} );
				},
				lastPaneEvent         : function () {
					if ( view.collection.length && count !== view.collection.length - 1 ) {
						base.getCarouselCustomAction( view, view.collection, 1, base );
					}
				}
			} );
		} );
	}

	function showDetails ( item ) {
		var tooltipText = '';

		removeTooltip( $( item.currentTarget ) );

		if ( !$( item.currentTarget ).hasClass( 'blued' ) ) {
			$( item.currentTarget ).addClass( 'blued fa-times-circle').removeClass( 'grayed fa-info-circle' );
			tooltipText = 'Close';
			$( item.currentTarget ).closest( 'li' ).find( 'div.sc-overlay-details' ).fadeIn();
		} else {
			$( item.currentTarget ).addClass( 'grayed fa-info-circle' ).removeClass( 'blued fa-times-circle' );
			tooltipText = 'Description';
			$( item.currentTarget ).closest( 'li' ).find( 'div.sc-overlay-details' ).fadeOut();
		}

		addTooltip( $( item.currentTarget ) , { 'title' : tooltipText  }  );
		showTooltip( $( item.currentTarget ) );

	}

	function addTooltip ( elem , options ) {
		if ( !modernizr.touch ) {
			elem.attr( 'title' , options.title || '' ).tooltip( options );
			console.log( elem.attr( 'title' , options.title || '' ).tooltip( options ) );
		}
	}

	function removeTooltip ( elem ) {
		if ( !modernizr.touch ) {
			elem.tooltip( 'destroy' );
		}
	}

	function showTooltip ( elem ) {
		if ( !modernizr.touch ) {
			elem.tooltip( 'show' );
		}
	}

	function doRemoveItemOnCarousel ( container, item ) {
		require( [ 'pc-carouselSnap' ], function ( $ ) {
			$( container ).carouselRemove( item );
		} );
	}

	UIManager.prototype = {

		/**
		 * Apply circular scroll to initially fetched videos
		 * @param  {JQuery Obj} container UL element
		 */
		'applyCircularScroll'  : function ( container, appendToID, view, base, count ) {
			doApplyCircularScroll( container, appendToID, view, base, count );
		},

		'removeItemOnCarousel' : function ( container, item ) {
			doRemoveItemOnCarousel( container, item );
		}
	};

	return new UIManager();

} );
