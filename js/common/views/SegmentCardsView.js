define( function ( require ) {
	'use strict';

	var _                 = require( 'underscore' );
	var Marionette        = require( 'marionette' );
	var App               = require( 'App' );
	var template          = require( 'text!../templates/SegmentCards.html' );
	var getAbbreviation   = require( '../helpers/getAbbreviation' );
	var stripHtml         = require( '../helpers/stripHtml' );
	var convertSecsToMins = require( '../helpers/convertSecsToMins' );
	var getConfig         = require( 'common/helpers/getConfig' );
	var modernizr         = window.Modernizr;

	require( 'jquery.spin' );

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
				return getAbbreviation( stripHtml( this.ContentDescription || this.Description ) , 200 );
			},

			'duration' : function () {
				return this.SegmentLengthInSeconds ? convertSecsToMins( this.SegmentLengthInSeconds ) : '';
			},

			'imageUrl' : function () {

				var imgURL = this.ImageURL ? getConfig( 'contentThumbnailPath' ) + this.ImageURL : 'img/thumbnail-default.jpg';

				return imgURL;
			},

			'linkUrl' : function () {
				var uuv = this.UUVideoId ? '?uuv=true' : '';

				return '#resources/videos/' + ( this.ContentId || this.UUVideoId )  + uuv;
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
			this.ui.loadingIcon.spin( false );
		},

		'navigateToVideoPage' : function ( ev ) {
			ev.preventDefault();

			var uuv = this.model.get( 'UUVideoId' ) ? '?uuv=true' : '';

			App.navigate( '#resources/videos/' + this.model.id + uuv , { 'trigger' : true } );
		},

		'showDetails' : function () {
			var tooltipText = '';

			this.removeTooltip( this.ui.infoIcon );

			if ( !this.ui.infoIcon.hasClass( 'blued' ) ) {
				this.ui.infoIcon.addClass( 'blued fa-times-circle').removeClass( 'grayed fa-info-circle' );
				tooltipText = 'Close';
				this.ui.infoOverlay.fadeIn();
				this.ui.watchIcon.addClass( 'grayed-overlay' );
			} else {
				this.ui.infoIcon.addClass( 'grayed fa-info-circle' ).removeClass( 'blued fa-times-circle' );
				tooltipText = 'Description';
				this.ui.infoOverlay.fadeOut();
				this.ui.watchIcon.removeClass( 'grayed-overlay' );
			}

			this.addTooltip( this.ui.infoIcon , { 'title' : tooltipText  }  );
			this.showTooltip( this.ui.infoIcon );
		},

		'watchLaterQueue' : function () {
			if ( this.model.get( 'queued' ) ) {
				App.request( 'common:removeFromQueue', this.model );
			} else {
				App.request( 'common:addToQueue', this.model );
			}

			this.ui.watchIcon.tooltip( 'destroy' );
			this.ui.watchIcon.hide();
			this.ui.loadingIcon.show().spin( 'small' );
		},

		'matchedSegmentsToQueue' : function () {
			if ( this.model.get( 'queued' ) ) {
				this.ui.watchIcon.removeClass( 'grayed' ).addClass( 'blued' );
				this.addTooltip( this.ui.watchIcon ,  { 'title' :  'Remove from Queue' } );
			} else {
				this.ui.watchIcon.removeClass( 'blued' ).addClass( 'grayed' );
				this.addTooltip( this.ui.watchIcon , { 'title' : 'Add to Queue' } );
			}

			this.ui.loadingIcon.hide().spin( false );
			this.ui.watchIcon.show();
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
