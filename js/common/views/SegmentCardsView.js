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

		'className' : 'col-xs-12 col-sm-6 col-md-4',

		'template' : _.template( template ),

		'tagName' : 'li',

		'ui' : {
			'infoIcon'  : '.sc-info-icon',
			'watchIcon' : '.sc-watch-later-icon'
		},

		'events' : {
			'click @ui.infoIcon'  : 'showDetails',
			'click @ui.watchIcon' : 'watchLaterQueue'
		},

		'templateHelpers' : {

			'shortContentName' : function () {
				return getAbbreviation( this.ContentName , 60 );
			},

			'shortContentDescription' : function () {
				return getAbbreviation( stripHtml( this.ContentDescription ) , 180 );
			},

			duration : function () {
				return convertSecsToMins( this.SegmentLengthInSeconds );
			}
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.listenTo( this.model, 'change:queued', this.matchedSegmentsToQueue );
		},

		'showDetails' : function ( ) {
			if ( !this.ui.infoIcon.hasClass( 'blued' ) ) {
				this.ui.infoIcon
					.addClass( 'blued' )
					.removeClass( 'grayed' )
					.siblings( 'div.sc-overlay-details' ).fadeIn();
			} else {
				this.ui.infoIcon
					.removeClass( 'blued' )
					.addClass( 'grayed' )
					.siblings( 'div.sc-overlay-details' ).fadeOut();
			}
		},

		'watchLaterQueue' : function () {
			if ( this.model.get( 'queued' ) ) {
				App.request( 'common:removeFromQueue' , this.model );
			} else {
				App.request( 'common:addToQueue' , this.model );
			}
		},

		'matchedSegmentsToQueue' : function () {
			if ( this.model.get( 'queued' ) ) {
				this.ui.watchIcon.removeClass( 'grayed' ).addClass( 'blued' );
			} else {
				this.ui.watchIcon.removeClass( 'blued' ).addClass( 'grayed' );
			}
		}

	} );
} );
