define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../../templates/SegmentCard/SegmentCardsFooter.html' );

	var modernizr  = window.Modernizr;

	require( 'jquery.spin' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
		'className' : 'sc-icon',
		'tagName'   : 'li',

		'ui' : {
			'infoIcon'      : '.sc-info-icon',
			'watchIcon'     : '.sc-watch-later-icon',
			'completedIcon' : '.sc-completed-icon',
			'loadingIcon'   : '.sc-watch-later-loading-icon'
		},

		'events' : {
			'click @ui.infoIcon'  : 'showDetails',
			'click @ui.watchIcon' : 'watchLaterQueue'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.model.set( 'id', this.model.get( 'ContentId' ) );
			this.listenTo( this.model, 'change:queued', this.matchedSegmentsToQueue );

			return this;
		},

		'onShow' : function () {
			this.addTooltip( this.ui.infoIcon , { 'title' : 'Description' } );
			this.addTooltip( this.ui.completedIcon , { 'title' : 'Completed' } );
			this.matchedSegmentsToQueue();
		},

		'matchedSegmentsToQueue' : function () {

			if ( this.model.get( 'queued' ) ) {
				this.ui.watchIcon.removeClass( 'text-muted' ).addClass( 'text-primary' );
				this.addTooltip( this.ui.watchIcon ,  { 'title' :  'Remove from Queue' } );
			} else {
				this.ui.watchIcon.removeClass( 'text-primary' ).addClass( 'text-muted' );
				this.addTooltip( this.ui.watchIcon , { 'title' : 'Add to Queue' } );
			}

			this.ui.watchIcon.hide().spin( false );
			this.ui.watchIcon.removeClass( 'sc-loading-icon' ).addClass( 'fa-clock-o' );
			this.ui.watchIcon.show();

		},

		'showDetails' : function () {
			this.trigger( 'details', this, this.ui );
		},

		'watchLaterQueue' : function () {
			if ( this.model.get( 'queued' ) ) {
				App.request( 'common:removeFromQueue', this.model );
			} else {
				App.request( 'common:addToQueue', this.model );
			}

			this.ui.watchIcon.tooltip( 'destroy' );
			this.ui.watchIcon.removeClass( 'fa-clock-o' ).addClass( 'sc-loading-icon' );
			this.ui.watchIcon.show().spin( 'small' );
		},

		'onClose' : function () {
			this.removeTooltip( this.ui.infoIcon );
			this.removeTooltip( this.ui.watchIcon );
			this.ui.watchIcon.spin( false );
		},

		'addTooltip' : function ( elem , options ) {
			if ( !modernizr.touch ) {
				elem.tooltip( options );
			}
		},

		'removeTooltip' : function ( elem ) {
			if ( !modernizr.touch ) {
				elem.tooltip( 'destroy' );
			}
		},

		'showTooltip' : function ( elem ) {
			if ( !modernizr.touch ) {
				elem.tooltip( 'show' );
			}
		}
	} );

} );
