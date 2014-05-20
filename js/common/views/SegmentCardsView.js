define( function ( require ) {
	'use strict';

	var _                 = require( 'underscore' );
	var Marionette        = require( 'marionette' );
	var App               = require( 'App' );
	var template          = require( 'text!../templates/SegmentCards.html' );
	var getAbbreviation   = require( '../helpers/getAbbreviation' );
	var stripHtml         = require( '../helpers/stripHtml' );
	var convertSecsToMins = require( '../helpers/convertSecsToMins' );
	var modernizr         = window.Modernizr;

	return Marionette.ItemView.extend( {

		'className' : 'col-xs-12 col-sm-6 col-md-4 col-lg-4',

		'template' : _.template( template ),

		'tagName' : 'li',

		'ui' : {
			'infoIcon'    : 'span.sc-info-icon',
			'watchIcon'   : 'span.sc-watch-later-icon',
			'loadingIcon' : 'span.sc-watch-later-loading-icon',
			'infoOverlay' : 'div.sc-overlay-details',
			'playNowLink' : 'a.sc-play-link'
		},

		'events' : {
			'click @ui.infoIcon'    : 'showDetails',
			'click @ui.watchIcon'   : 'watchLaterQueue',
			'click @ui.playNowLink' : 'navigateToVideoPage'
		},

		'templateHelpers' : {

			'shortContentName' : function () {
				return getAbbreviation( this.ContentName || this.Name, 50 );
			},

			'longContentName' : function () {
				return getAbbreviation( this.ContentName || this.Name, 126 );
			},

			'fullContentName' : function () {
				return this.ContentName || this.Name;
			},

			'shortContentDescription' : function () {
				return getAbbreviation( stripHtml( this.ContentDescription || this.Description ) , 250 );
			},

			'duration' : function () {
				return convertSecsToMins( this.SegmentLengthInSeconds );
			}
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.listenTo( this.model, 'change:queued', this.matchedSegmentsToQueue );
			this.listenTo( App.vent, 'common:queueFailed', this.matchedSegmentsToQueue );
		},

		'onRender' : function () {
			this.$el.fadeIn( 'normal' );
		},

		'onShow' : function () {
			this.addTooltip( this.ui.infoIcon , { 'title' : 'Description' } );
			this.matchedSegmentsToQueue();
		},

		'onClose' : function () {
			this.removeTooltip( this.ui.infoIcon );
			this.removeTooltip( this.ui.watchIcon );
		},

		'navigateToVideoPage' : function ( ev ) {
			ev.preventDefault();
			App.navigate( '#resources/videos/' + this.model.id , { trigger : true } );
		},

		'showDetails' : function () {
			this.removeTooltip( this.ui.infoIcon );

			if ( !this.ui.infoIcon.hasClass( 'blued' ) ) {
				this.ui.infoOverlay.fadeIn( function () {
					this.ui.infoIcon.addClass( 'blued fa-times-circle').removeClass( 'grayed fa-info-circle' );
					this.addTooltip( this.ui.infoIcon , { 'title' : 'Close' }  );
					this.showTooltip( this.ui.infoIcon );
				}.bind( this ) );
			} else {
				this.ui.infoOverlay.fadeOut( function () {
					this.ui.infoIcon.addClass( 'grayed fa-info-circle' ).removeClass( 'blued fa-times-circle' );
					this.addTooltip( this.ui.infoIcon , { 'title' : 'Description' } );
					this.showTooltip( this.ui.infoIcon );
				}.bind( this ) );
			}
		},

		'watchLaterQueue' : function () {
			if ( this.model.get( 'queued' ) ) {
				App.request( 'common:removeFromQueue', this.model );
			} else {
				App.request( 'common:addToQueue', this.model );
			}

			this.ui.watchIcon.tooltip( 'destroy' );
			this.ui.watchIcon.hide();
			this.ui.loadingIcon.show();
		},

		'matchedSegmentsToQueue' : function () {
			if ( this.model.get( 'queued' ) ) {
				this.ui.watchIcon.removeClass( 'grayed' ).addClass( 'blued' );
				this.addTooltip( this.ui.watchIcon ,  { 'title' :  'Remove from Watch Later List' } );
			} else {
				this.ui.watchIcon.removeClass( 'blued' ).addClass( 'grayed' );
				this.addTooltip( this.ui.watchIcon , { 'title' : 'Add to Watch Later List' } );
			}

			this.ui.loadingIcon.hide();
			this.ui.watchIcon.show();
		},

		'addTooltip' : function ( elem , options ) {
			if ( !modernizr.touch ) {
				elem.attr( 'title' , options.title || '' ).tooltip( options );
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
