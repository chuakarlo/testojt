define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );
	var template   = require( 'text!../templates/contentNavigationFilterItemView.html' );
	var $ = require( 'jquery' );

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'template' : _.template( template ),

		'ui' : {
			'filter' : '.cn-filter-item'
		},

		'events' : {
			'click @ui.filter' : 'filterSegments'
		},

		'filterSegments' : function () {

			var filter            = this.model.get( 'title' );
			var hasPendingRequest = App.request( 'contentNavigation:hasPendingRequest' );
			var reqSort           = App.request( 'contentNavigation:getSort' );
			var countBefore       = null;
			var countAfter        = null;
			var sort              = null;

			if ( hasPendingRequest ) {
				return;
			}

			Vent.trigger( 'contentNavigation:resetBodyScroll' );
			countBefore = $( '.cn-pd360-filters' ).find( '.selected' ).length;
			this.$el.toggleClass( 'selected' );
			countAfter = $( '.cn-pd360-filters' ).find( '.selected' ).length;

			if ( !countBefore && countAfter ) {
				sort = 'score desc';
				Vent.trigger( 'contentNavigation:updateRelevance', true );
			}

			if ( countBefore && !countAfter && reqSort === 'score desc' ) {
				sort = 'created desc';
				Vent.trigger( 'contentNavigation:updateRelevance', false );
			}

			Vent.trigger(
				'contentNavigation:updateSearchData',
				filter.toLowerCase(),
				this.model.get( 'category' ),
				sort
			);
		}

	} );

} );
