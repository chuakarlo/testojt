define( function ( require ) {
	'use strict';

	var modernizr = window.Modernizr;
	var App       = require( 'App' );

	return {
		'onRender' : function () {
			this.$el.fadeIn( 'normal' );
		},

		'onShow' : function () {
			this.addTooltip( this.ui.infoIcon , { 'title' : 'Description' } );
			if ( !this.model.get( 'ViewingCompleted' ) ) {
				this.matchedSegmentsToQueue();
			} else {
				this.addTooltip( this.ui.viewCompletedIcon , { 'title' : 'Completed' } );
			}
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
				this.ui.infoIcon.addClass( 'blued fa-times-circle' ).removeClass( 'grayed fa-info-circle' );
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

		'setTouch' : function ( elem, options ) {
			if ( !modernizr.touch ) {
				elem.tooltip( options );
			}
		},

		'addTooltip' : function ( elem , options ) {
			this.setTouch ( elem, options );
		},

		'removeTooltip' : function ( elem ) {
			this.setTouch ( elem, 'destroy' );
		},

		'showTooltip' : function ( elem ) {
			this.setTouch ( elem, 'show' );
		}
	};

} );
