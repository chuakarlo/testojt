define( function ( require ) {
	'use strict';

	var _                 = require( 'underscore' );
	var Marionette        = require( 'marionette' );
	var App               = require( 'App' );
	var template          = require( 'text!../templates/SegmentCards.html' );
	var getAbbreviation   = require( '../helpers/getAbbreviation' );
	var stripHtml         = require( '../helpers/stripHtml' );
	var convertSecsToMins = require( '../helpers/convertSecsToMins' );

	return Marionette.ItemView.extend( {

		'className' : 'col-xs-12 col-sm-6 col-md-4 col-lg-4',

		'template' : _.template( template ),

		'tagName' : 'li',

		'ui' : {
			'infoIcon'    : 'a.sc-info-icon',
			'watchIcon'   : 'a.sc-watch-later-icon',
			'infoOverlay' : 'div.sc-overlay-details',
			'loadingIcon' : 'i.sc-watch-later-loading-icon'
		},

		'events' : {
			'click @ui.infoIcon'  : 'showDetails',
			'click @ui.watchIcon' : 'watchLaterQueue'
		},

		'templateHelpers' : {

			'shortContentName' : function () {
				return getAbbreviation( this.ContentName ||  this.Name, 60 );
			},

			'shortContentDescription' : function () {
				return getAbbreviation( stripHtml( this.ContentDescription || this.Description ) , 180 );
			},

			duration : function () {
				return convertSecsToMins( this.SegmentLengthInSeconds );
			}
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.model.set( 'VideoTypeId', this.model.attributes.UUVideoId  ? 1 : 2 );

			this.listenTo( this.model, 'change:queued', this.matchedSegmentsToQueue );
		},

		'onShow' : function () {
			this.ui.infoIcon.tooltip( { 'title' : 'Description' } );
			this.matchedSegmentsToQueue();
		},

		'onClose' : function () {
			this.ui.infoIcon.tooltip( 'destroy' );
			this.ui.watchIcon.tooltip( 'destroy' );
		},

		'showDetails' : function ( ev ) {
			ev.preventDefault();

			if ( !this.ui.infoIcon.hasClass( 'blued' ) ) {
				this.ui.infoIcon
					.addClass( 'blued fa-times-circle')
						.removeClass( 'grayed fa-info-circle' )
							.tooltip( 'destroy' )
								.attr( 'title' , 'Close' )
									.tooltip( 'show' );

				this.ui.infoOverlay.fadeIn();
			} else {
				this.ui.infoIcon
					.addClass( 'grayed fa-info-circle' )
						.removeClass( 'blued fa-times-circle' )
							.tooltip( 'destroy' )
								.attr( 'title' , 'Description' )
									.tooltip( 'show' );

				this.ui.infoOverlay.fadeOut();
			}
		},

		'watchLaterQueue' : function ( ev ) {
			ev.preventDefault();

			if ( this.model.get( 'queued' ) ) {
				App.request( 'common:removeFromQueue' , this.model );
			} else {
				App.request( 'common:addToQueue' , this.model );
			}

			this.ui.watchIcon.tooltip( 'destroy' );
			this.ui.watchIcon.hide();
			this.ui.loadingIcon.show();
		},

		'matchedSegmentsToQueue' : function () {
			if ( this.model.get( 'queued' ) ) {
				this.ui.watchIcon
					.removeClass( 'grayed' )
						.addClass( 'blued' )
							.tooltip( {
								'title' : 'Remove from Watch Later List'
							} );
			} else {
				this.ui.watchIcon
					.removeClass( 'blued' )
						.addClass( 'grayed' )
							.tooltip( {
								'title' : 'Add to Watch Later List'
							} );
			}

			this.ui.loadingIcon.hide();
			this.ui.watchIcon.show();
		}

	} );
} );
