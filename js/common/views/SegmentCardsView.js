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
	var Methods           = require( 'common/views/SegmentCardMethods' );

	require( 'jquery.spin' );

	return Marionette.ItemView.extend( {

		'className' : 'col-xs-12 col-sm-6 col-md-4 col-lg-4',

		'template' : _.template( template ),

		'tagName' : 'li',

		'ui' : {
			'infoIcon'          : 'span.sc-info-icon',
			'watchIcon'         : 'span.sc-watch-later-icon',
			'viewCompletedIcon' : 'span.sc-view-completed-icon',
			'loadingIcon'       : 'span.sc-watch-later-loading-icon',
			'infoOverlay'       : 'div.sc-overlay-details',
			'playNowLink'       : 'a.sc-play-link'
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

			'program' : function () {
				return this.ProgramName ? getAbbreviation( this.ProgramName, 21 ) : '';
			},

			'getProgramName' : function () {
				return this.ProgramName ? this.ProgramName : '';
			},

			'getProgramLink' : function () {
				return !this.ProgramName ? '' : '#resources/program?ContentId=' + this.ContentId + '&ContentParentId=' + this.ContentParentId + '&ContentTypeId=' + this.ContentTypeId;
			},

			'showProgram' : function () {
				return this.ProgramName ? '' : 'sc-hide-program';
			},

			'duration' : function () {
				return this.SegmentLengthInSeconds ? convertSecsToMins( this.SegmentLengthInSeconds ) : '';
			},

			'imageUrl' : function () {

				var imgURL = this.ImageURL ? getConfig( 'contentThumbnailPath' ) + this.ImageURL : 'img/thumbnail-default.jpg';

				return imgURL;
			},

			'queueCompleted' : function () {

				var qcIcon = !this.ViewingCompleted ? 'sc-watch-later-icon grayed fa fa-clock-o' : 'sc-view-completed-icon fa fa-check-circle';

				return qcIcon;
			},

			'linkUrl' : function () {
				var uuv = this.UUVideoId ? '?uuv=true' : '';

				return '#resources/videos/' + ( this.ContentId || this.UUVideoId )  + uuv;
			}
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			// Methods are now placed in separate file due to cyclomatic complexity error
			_.defaults( this, Methods );

			this.listenTo( this.model, 'change:queued', this.matchedSegmentsToQueue );
			this.listenTo( App.vent, 'common:queueFailed', this.matchedSegmentsToQueue );
		}

	} );

} );
