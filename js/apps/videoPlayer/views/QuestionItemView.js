define( function ( require ) {
	'use strict';

	require( 'jquery.autogrow' );

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!videoPlayer/templates/questionItemView.html' );
	var config     = require( 'config' ).questions;

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'className' : 'questions-item',

		'template' : _.template( template ),

		'ui' : {
			'textInput' : 'textarea'
		},

		'events' : {
			'keyup @ui.textInput' : 'onKeyUp'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );
		},

		'onShow' : function () {
			if ( this.model.get( 'QuestionTypeId') === 2 && this.textLock ) {
				this.ui.textInput.val( config.message ).
					addClass( 'video-question-lock' ).
					attr( 'disabled', 'disabled' );

			}
			this.ui.textInput.css( 'overflow', 'hidden' ).autogrow();
		},

		'onKeyUp' : function () {
			this.ui.textInput.removeClass( 'error' );

			// Sane check if model has this attribute.
			// We may be mistakenly setting a model attribute
			// which isn't present.
			if ( this.model.has( 'AnswerText' ) ) {
				this.model.set( 'AnswerText', this.ui.textInput.val().trim() );
			}
		}

	} );

} );
