define( function ( require ) {
	'use strict';

	require( 'jquery.autogrow' );
	require( 'videoPlayer/config' );

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!videoPlayer/templates/questionItemView.html' );
	var App        = require( 'App' );
	var config     = App.request( 'videoPlayer:config' ).questions;

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'className' : 'questions-item',

		'template' : _.template( template ),

		'saveSuccess' : '<i class="fa fa-check"></i> Auto-saved',

		'saveError' : '<i class="fa fa-times"></i> Auto-save interrupted. Check your internet connection.',

		'saveProgress' : 'Saving...',

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
				function safeString ( unsafe ) {
					return String( unsafe )
						.replace( /<\/script/g, '<\\/script' )
						.replace( /<!--/g, '<\\!--' );
				}

				// Replacing /%nl%/ string pattern to make newline
				return _.unescape( safeString( this.AnswerText.replace( /%nl%/g, '\n' ) ) );
			}

		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );
		},

		'onShow' : function () {
			if ( this.model.get( 'QuestionTypeId') === 2 && this.textLock ) {
				this.ui.textInput.val( config.message )
					.addClass( 'video-question-lock' )
					.attr( 'disabled', 'disabled' );

				this.ui.notifier.html( '' );
			}
			this.ui.textInput.css( 'overflow', 'hidden' ).autogrow();
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
			if ( answerText === prevAnswer ) {
				return;
			}
			this.ui.notifier.html( this.saveProgress );
			this.model.set( 'AnswerText', answerText );
			this.model.save( null, {
				'success' : function ( model ) {
					this.ui.notifier.html( this.saveSuccess );
				}.bind( this ),
				'error'   : function () {
					this.ui.notifier.html( this.saveError );
				}.bind( this )
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
			this.interval = setInterval( this.saveModel.bind( this ), config.autosaveInterval );
		},

		'onFocus' : function () {
			this.trackActivity();
			this.startAutosave();
		},

		'onBlur' : function () {
			this.autosaving = false;
			this.saveModel();
			clearInterval( this.interval );
		}

	} );

} );
