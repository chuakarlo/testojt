define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/main.html' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
		'className' : 'learning-targets',

		'ui' : {
			'nav'           : '.lt-left-nav',
			'closeTrackBtn' : '.close-track'
		},

		'events' : {
			'click @ui.closeTrackBtn' : 'hideTrackSection'
		},

		'hideTrackSection' : function ( e ) {
			e.preventDefault();
			var self         = this;
			var trackSection = self.el.querySelector( '.lt-track' );

			// hide lt-track section
			$( trackSection ).hide();
		},

		'activateTab' : function ( content ) {
			var self = this;

			// remove class from current active li
			$( self.ui.nav )
				.find( '.active' )
				.removeClass( 'active' );

			// activate selected tab
			$( '.' + content ).addClass( 'active' );
		}
	} );

} );
