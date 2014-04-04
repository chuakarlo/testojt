define( function( require ) {
	'use strict';

	require( 'jquery.autogrow' );

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template = require( 'text!videoPlayer/templates/reflection/reflectionItemView.html' );

	return Marionette.ItemView.extend( {
		'className' : 'reflection-item',

		'template' : _.template( template ),

		'ui' : {
			'textInput' : 'textarea'
		},

		'events' : {
			'keyup @ui.textInput' : 'onKeyUp'
		},

		initialize : function () {},

		'onShow' : function () {
			this.ui.textInput.css( 'overflow' , 'hidden' ).autogrow();
		},

		'onKeyUp' : function () {
			this.ui.textInput.removeClass( 'error' );

			function safeString( unsafe ) {
				return String( unsafe )
					.replace( /<\/script/g, '<\\/script' )
					.replace( /<!--/g, '<\\!--' );
			}

			// Sane check if model has this attribute
			// We may be mistakenly setting an attribute
			// that is not part of the data
			if ( this.model.has( 'AnswerText' ) ) {
				this.model.set( 'AnswerText', _.escape( safeString( this.ui.textInput.val().trim() ) ) );
			} else  {
				throw new Error( 'Model has no attribute "AnswerText"' );
			}
		}
	} );
} );
