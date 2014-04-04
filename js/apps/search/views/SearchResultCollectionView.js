define( function( require ) {
	'use strict';

	var App                  = require( 'App' );
	var _                    = require( 'underscore' );
	var Marionette           = require( 'marionette' );
	var searchResultItemView = require( './SearchResultItemView' );

	var ColleagueItemView = require( './ColleagueItemView' );
	var CommunityItemView = require( './CommunityItemView' );
	var GroupItemView     = require( './GroupItemView' );
	var VideoItemView     = require( './VideoItemView' );
	var EmptyTemplate     = require( 'text!search/templates/EmptyResultView.html' );

	// The EmptyResultView is only used with this collection
	var EmptyResultView = Marionette.ItemView.extend( {
		'className' : 'no-results',
		'template'  : _.template( EmptyTemplate )
	} );

	return Marionette.CollectionView.extend( {

		'tagName'   : 'ul',
		'className' : 'row sr-container',
		'itemView'  : searchResultItemView,
		'emptyView' : EmptyResultView,

		'getItemView' : function( item ) {
			
			// Check which type of model needs to be displayed
			// and return the proper view.
			if (item instanceof App.Entities.ColleagueModel) {
				return ColleagueItemView;
			} else if (item instanceof App.Entities.CommunityModel) {
				return CommunityItemView;
			} else if (item instanceof App.Entities.GroupModel) {
				return GroupItemView;
			} else if (item instanceof App.Entities.VideoModel) {
				return VideoItemView;
			}
		}

	} );
} );