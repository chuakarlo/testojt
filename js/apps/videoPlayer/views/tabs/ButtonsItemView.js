define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var template   = require( 'text!videoPlayer/templates/tabs/buttonsItemView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'className' : 'button-container',

		'ui' : {
			'userQueue'  : '#user-queue',
			'shareVideo' : '#share-video'
		},

		'events' : {
			'click @ui.userQueue'  : 'setUserQueue',
			'click @ui.shareVideo' : 'showShareDialog'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.listenTo( this.model, 'change:queued', this.setQueueBtnUI );
			this.listenTo( App.vent, 'common:queueFailed', this.setQueueBtnUI );

			return this;
		},

		'onShow' : function () {
			this.setQueueBtnUI();
		},

		'setUserQueue' : function ( e ) {
			e.preventDefault();

			this.ui.userQueue.button( 'loading' );

			if ( this.model.get( 'queued' ) ) {
				App.request( 'common:removeFromQueue', this.model );
			} else {
				App.request( 'common:addToQueue', this.model );
			}
		},

		'setQueueBtnUI' : function () {
			this.ui.userQueue.button( 'reset' );

			if ( this.model.get( 'queued' ) ) {
				this.ui.userQueue.text( 'Remove from Queue' );
			} else {
				this.ui.userQueue.text( 'Add to Queue' );
			}
		},

		'showShareDialog' : function ( e ) {
			e.preventDefault();

			App.vent.trigger( 'videoPlayer:showShareDialog', this.model );
		}

	} );

} );
