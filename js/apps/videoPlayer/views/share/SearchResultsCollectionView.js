define( function ( require ) {
	'use strict';

	// libraries
	var $          = require( 'jquery' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );

	// views
	var ItemView   = require( 'videoPlayer/views/share/SearchResultItemView' );
	var NoItemView = require( 'videoPlayer/views/NoItemView' );

	return Marionette.CollectionView.extend( {

		'initialize' : function () {
			$( 'body' ).bind( 'click', this.triggerClickBody );
		},

		'itemView' : ItemView,

		'emptyView' : NoItemView,

		'tagName' : 'ul',

		'className' : 'search-ac',

		'onClose' : function () {
			$( 'body' ).unbind( 'click' );
		},

		'triggerClickBody' : function ( evt ) {
			Vent.trigger( 'click:body', evt );
		}

	} );

} );
