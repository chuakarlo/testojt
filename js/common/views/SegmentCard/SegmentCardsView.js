define ( function ( require ) {
	'use strict';

	var _                      = require( 'underscore' );
	var Marionette             = require( 'marionette' );
	var Backbone               = require( 'backbone' );
	var App                    = require( 'App' );
	var template               = require( 'text!../../templates/SegmentCard/SegmentCards.html' );
	var SegmentCardsFooterView = require( '../../views/SegmentCard/SegmentCardsFooterView' );

	var getAbbreviation        = require( '../../helpers/getAbbreviation' );
	var convertSecsToMins      = require( '../../helpers/convertSecsToMins' );
	var stripHtml              = require( '../../helpers/stripHtml' );
	var getConfig              = require( 'common/helpers/getConfig' );
	var modernizr              = window.Modernizr;

	return Marionette.CompositeView.extend( {

		'className'         : 'col-xs-6 col-sm-6 col-md-4 col-lg-4',
		'itemView'          : SegmentCardsFooterView,
		'itemViewContainer' : '.sc-footer-icons',
		'template'          : _.template( template ),
		'tagName'           : 'li',

		'ui' : {
			'playNowLink' : 'a.sc-play-link',
			'infoOverlay' : 'div.sc-overlay-details',
			'watchIcon'   : '.sc-watch-later-icon'
		},

		'events' : {
			'click @ui.playNowLink' : 'navigateToVideoPage'
		},

		'templateHelpers' : {

			'shortContentName' : function () {
				return getAbbreviation( this.ContentName || this.Name, 50 );
			},

			'fullContentName' : function () {
				return this.ContentName || this.Name;
			},

			'shortContentDescription' : function () {
				return getAbbreviation( stripHtml( this.ContentDescription || this.Description ) , 200 );
			},

			'longContentName' : function () {
				return getAbbreviation( this.ContentName || this.Name, 126 );
			},

			'duration' : function () {
				return this.SegmentLengthInSeconds ? convertSecsToMins( this.SegmentLengthInSeconds ) : '';
			},

			'imageUrl' : function () {
				var imgURL    = this.ImageURL ? getConfig( 'contentThumbnailPath' ) + this.ImageURL.replace( getConfig( 'contentThumbnailPath' ), '' ) : 'img/thumbnail-default.jpg';

				return imgURL;
			},

			'linkUrl' : function () {
				var uuv = this.UUVideoId ? '?uuv=true' : '';

				return '#resources/videos/' + ( this.ContentId || this.UUVideoId )  + uuv;
			}
		},

		'initialize' : function ( options ) {

			_.extend( options.model.attributes, options.setClassIcons );
			this.collection = new Backbone.Collection( options.model );

			this.on( 'itemview:itemview:details', this.showDetails );

			return this;
		},

		'onRender' : function () {
			this.$el.fadeIn( 'normal' );
		},

		'navigateToVideoPage' : function ( ev ) {
			ev.preventDefault();

			var uuv = this.model.get( 'UUVideoId' ) ? '?uuv=true' : '';

			App.navigate( '#resources/videos/' + this.model.id + uuv , { 'trigger' : true } );
		},

		'showDetails' : function ( view, itemViewUi ) {
			var tooltipText = '';

			this.removeTooltip( itemViewUi.ui.infoIcon );
			if ( !itemViewUi.ui.infoIcon.hasClass( 'text-primary' ) ) {
				itemViewUi.ui.infoIcon.addClass( 'text-primary fa-times-circle' ).removeClass( 'text-muted fa-info-circle' );
				tooltipText = 'Close';
				this.ui.infoOverlay.fadeIn();
			} else {
				itemViewUi.ui.infoIcon.addClass( 'fa-info-circle text-muted' ).removeClass( 'text-primary fa-times-circle' );
				tooltipText = 'Description';
				this.ui.infoOverlay.fadeOut();
			}

			this.addTooltip( itemViewUi.ui.infoIcon , { 'title' : tooltipText  }  );
			this.showTooltip( itemViewUi.ui.infoIcon );
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
