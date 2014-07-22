define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );

	var template   = require( 'text!../templates/ProgramDetails.html' );

	return Marionette.ItemView.extend( {

		'tagName' : 'span',

		'template' : _.template( template ),

		'ui' : {
			'descriptionButton' : '.description-button'
		},

		'events' : {
			'click @ui.descriptionButton' : 'toggleMobileDescription'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			this.options = options;
		},

		'templateHelpers' : function () {
			var options = this.options;

			return {
				'programName' : function () {
					return options.details.ProgramName;
				},

				'programDescription' : function () {
					return options.details.ProgramDescription;
				}
			};
		},

		'toggleMobileDescription' : function ( e ) {
			e.preventDefault();

			if ( $( '.description-indicator' ).hasClass( 'fa-chevron-right' ) ) {
				$( '.description-indicator' ).removeClass( 'fa-chevron-right' ).addClass( 'fa-chevron-down' );
			} else {
				$( '.description-indicator' ).removeClass( 'fa-chevron-down' ).addClass( 'fa-chevron-right' );
			}

			$( '.description-text' ).toggleClass( 'hidden-xs' );
		}

	} );

} );
