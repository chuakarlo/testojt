define( function ( require ) {
	'use strict';

	var App                  = require( 'App' );
	var Marionette           = require( 'marionette' );
	var searchResultItemView = require( './SearchResultItemView' );

	var CommunityItemView = require( './CommunityItemView' );
	var GroupItemView     = require( './GroupItemView' );
	var EmptyResultView   = require( 'search/views/EmptyResultView' );
	var SearchSegmentView = require( './SearchSegmentCardView' );

	return Marionette.CollectionView.extend( {

		'tagName'   : 'ul',
		'className' : 'row sr-container media-list',
		'itemView'  : searchResultItemView,
		'emptyView' : EmptyResultView,

		'initialize' : function () {
			// We don't want to show the empty view when there was a reset.
			// This indicates that we had a new search query with our existing
			// collection and it's showing the loading view.
			var oldIsEmpty = this.isEmpty;

			this.listenTo( this.collection, 'reset', function () {
				this.isEmpty = function ( collection ) {
					return false;
				};
			} );

			// Once it's been synced and the loading view is gone, go back to
			// the old isEmpty logic
			this.listenTo( this.collection, 'sync', function () {
				this.isEmpty = oldIsEmpty;
			} );

		},

		'getItemView' : function ( item ) {
			// Check which type of model needs to be displayed
			// and return the proper view.
			if ( item instanceof App.Entities.CommunityModel ) {
				return CommunityItemView;
			} else if ( item instanceof App.Entities.SearchGroupModel ) {
				return GroupItemView;
			} else if ( item instanceof App.Entities.VideoModel ) {
				return SearchSegmentView;
			}
		}

	} );
} );
