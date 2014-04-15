/**
 * UIManager
 * @class
 * Common UI manipulations across what-to-do-next Section
 */
define ( function ( require ) {
	'use strict';

	var WIDGET_BOX_WIDTH = 408;
	var MIN_WIDGETS_DISP = 3;
	var $                = require( 'jquery' );

	var UIManager = function () { };

	function doCoreUpdate ( eWidget, nAdd ){
		var nWidth = eWidget.children().length * WIDGET_BOX_WIDTH;
		if ( nAdd ) {
			nAdd *= WIDGET_BOX_WIDTH;
			nWidth += nAdd;
		}

		eWidget.css( { 'width' : nWidth + 'px' } );
	}

	function doUpdateWidgetPanelWidth ( eWidget, nAdd ) {
		doCoreUpdate( eWidget, nAdd );
	}

	function doUpdateAllWidgetPaneWidth ( eActive, eInactive, nAdd ) {
		doCoreUpdate( eActive, nAdd );
		doCoreUpdate( eInactive, nAdd );
	}

	UIManager.prototype = {

		/**
		 * Adjust the width parent container of widgets which is the UL element
		 * @param  {JQuery Obj} eWidget UL element
		 */
		'updateWidgetPaneWidth' : function ( eWidget, nAdd ) {
			doUpdateWidgetPanelWidth( eWidget, nAdd );
		},

		/**
		 * Adjust the width parent container of widgets which is the UL element
		 * @param  {JQuery Obj} eWidget UL element
		 */
		'updateAllWidgetPaneWidth' : function ( eActive, eInactive, nAdd ) {
			doUpdateAllWidgetPaneWidth ( eActive, eInactive, nAdd );
		},
		/**
		 * Get widget ID.
		 * @param {JQuery Object} ui Jquery ui object
		 */
		'getWidgetId' : function ( ui ) {
			var sWidgetId = $( ui.item[ 0 ] ).attr( 'id' );
			return sWidgetId;
		},

		/**
		 *
		 */
		'manageDeleteButtons' : function ( eJquery, nLength ) {

			if( eJquery ) {
				if ( nLength > MIN_WIDGETS_DISP ) {
					eJquery = eJquery.find( 'li' );
					eJquery.filter ( function () {
						//not to have delete-widget appended more than once
						return $(this).children().length < 4;
					} ).append('<div class="delete-widget"> </div>');
				} else {
					eJquery = eJquery.find( 'li div.delete-widget' );
					eJquery.remove();
				}
			}
		},
		/**
		 *
		 */
		'showDeleteButtons' : function ( eJquery ) {
			if( eJquery && ( eJquery.length > MIN_WIDGETS_DISP  ) ) {
					eJquery.filter ( function () {
						//not to have delete-widget appended more than once
						return $(this).children().length < 4;
					} ).append('<div class="delete-widget"> </div>');


			}
		},

		/**
		 *
		 */
		'removeDeleteButtons' : function ( eJquery, bNoCheck ) {

			if( ( eJquery && ( eJquery.length <= MIN_WIDGETS_DISP  ) ) ||
				  bNoCheck )  {
				eJquery.remove();
			}
		},
		/**
		 * Returns true if Widget Btn is active otherwise false
		 */
		'isWidgetBtnActive' : function ( ) {
			return $( '#widget-settings' ).hasClass( 'active' );
		},

		/**
		 * Enable dragging but check if number of available widgets
		 * is greater than Minimum of number of widgets to be displayed and not
		 * removable.
		 */
		'enableDrag' : function ( eJquery ) {
				//var nWidgets = eJquery.children().length;

				// require( [ 'jqueryui' ], function ( $ ) {
				// 	$(eJquery).sortable( 'enable' );
				// 	if ( nWidgets > MIN_WIDGETS_DISP ) {
				// 		$(eJquery).sortable( {'connectWith' : '#inactive-widgets .three-box'} );
				// 	} else {
				// 		$(eJquery).sortable( {'connectWith' : '#'} );
				// 	}
				// } );
		},

		'applyCircularScroll' : function ( container, appendToID ) {
			require( [ 'pc-carouselSnap' ], function( $ ) {
				$( container ).carouselSnap( {
					nextID                : 'next-slide-' + appendToID,
					prevID                : 'previous-slide-' + appendToID,
					elementsToMoveOnClick : 3,
					elementsToMoveOnHover : 3,
					startOnCenter         : true,
					time                  : 1000,
					beforeShift           : function () {},
					afterShift            : function () {}
				} );
			} );
		},

	};

	return new UIManager();

} );