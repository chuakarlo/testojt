define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var InnerMessageView = require( 'apps/messages/views/InnerMessageView' );
	var template         = require( 'text!apps/messages/templates/messages.html' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : InnerMessageView,
		'itemViewContainer' : '.accordion',
		'ui'                : {
			'filterItems' : '.filter .item',
			'date'        : '.filter .date',
			'sender'      : '.filter .sender',
			'all'         : '.dropdown-menu .all',
			'read'        : '.dropdown-menu .read',
			'unread'      : '.dropdown-menu .unread',
			'none'        : '.dropdown-menu .none'
		},

		'events' : {
			'click @ui.filterItems' : 'changeSort'
		},

		'changeSort' : function ( e ) {
			var filterElmnt = ( e.currentTarget ) ? e.currentTarget : e.srcElement;
			var filterItem  = $( filterElmnt );
			var sort        = filterItem.data( 'sort' );

			this.ui[ sort ].addClass( 'selected' ).siblings().removeClass( 'selected' );
			this.collection.changeSortBy( sort );
			this.collection.reset( this.collection.models );
		}
	} );

} );
