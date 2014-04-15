define( function ( require ) {
	'use strict';

	// libraries
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );

	// template
	var template   = require( 'text!videoPlayer/templates/share/searchResultsLayout.html' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'tagName' : 'ul',

		'className' : 'search-ac',

		'regions' : {
			'peopleResultsRegion' : '#people-results > div',
			'groupsResultsRegion' : '#groups-results > div'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			return this;
		},

		'onShow' : function () {
			this.peopleResultsRegion.show( this.peopleCollectionView );
			this.groupsResultsRegion.show( this.groupsCollectionView );

			// bind a click event on the body
			$( 'body' ).bind( 'click', this._triggerClickBody );
		},

		'onClose' : function () {
			$( 'body' ).unbind( 'click' );
		},

		'_triggerClickBody' : function ( event ) {
			Vent.trigger( 'videoPlayer:click:body', event );
		}

	} );

} );