define( function ( require ) {
	'use strict';

	require( 'videoPlayer/config' );

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!videoPlayer/templates/questionItemView.html' );
	var App        = require( 'App' );
	var config     = App.request( 'videoPlayer:config' ).questions;
	var utils      = require( 'videoPlayer/utils/utils' );

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'className' : 'questions-item',

		'template' : _.template( template ),

		'ui' : {
			'textInput' : 'textarea',
			'notifier'  : '.as-notifier'
		},

		'events' : {
			'keyup @ui.textInput' : 'onKeyUp',
			'focus @ui.textInput' : 'onFocus',
			'blur @ui.textInput'  : 'onBlur'
		},

		'templateHelpers' : {

			'sanitizedAnswer' : function () {
				// Replacing /%nl%/ string pattern to make newline.
				return _.unescape( utils.safeStringify( this.AnswerText ).replace( /%nl%/g, '\n' ) );
			}

		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.listenTo( this.model, 'request', this.notify.bind( this, config.saveProgress ) );
			this.listenTo( this.model, 'sync', this.notify.bind( this, config.saveSuccess ) );
			this.listenTo( this.model, 'error', this.notify.bind( this, config.saveError ) );
		},

		'onShow' : function () {
			if ( this.model.get( 'QuestionTypeId' ) === 2 && this.textLock ) {
				this.ui.textInput.val( config.message )
					.addClass( 'video-question-lock' )
					.attr( 'disabled', 'disabled' );

				this.ui.notifier.html( '' );
			}
		},

		'onKeyUp' : function () {
			this.trackActivity();
			if ( !this.autosaving ) {
				this.startAutosave();
			}
		},

		'saveModel' : function () {
			var answerText = this.ui.textInput.val().trim();
			var prevAnswer = this.model.get( 'AnswerText' );
			if ( this.model.getSanitizedAnswer( answerText ) === prevAnswer ) {
				return;
			}
			this.model.save( {
				'AnswerText' : answerText
			} );
		},

		'trackActivity' : function () {
			clearTimeout( this.activityTimeout );
			this.activityTimeout = setTimeout( function () {
				clearInterval( this.interval );
				this.autosaving = false;
			}.bind( this ), config.autosaveInactive );
		},

		'startAutosave' : function () {
			this.autosaving = true;
			this.interval = setInterval( function () {
				try {
					this.saveModel();
				} catch ( error ) {
					clearInterval( this.interval );
				}
			}.bind( this ), config.autosaveInterval );
		},

		'onFocus' : function () {
			this.trackActivity();
			this.startAutosave();
		},

		'onBlur' : function () {
			this.autosaving = false;
			this.saveModel();
			clearInterval( this.interval );
		},

		'notify' : function ( message ) {
			if ( this.ui.notifier instanceof $ ) {
				this.ui.notifier.html( message );
			}
		}

	} );

} );
