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
			'nav'        : '.lt-left-nav',
			'focusTitle' : '.nav-subtitle a'
		},

		'events' : {
			'click @ui.focusTitle' : 'activateTitleTab'
		},

		'activateTab' : function ( content, options ) {
			var self = this;

			// remove class from current active li
			$( self.ui.nav )
				.find( '.active' )
				.removeClass( 'active' );

			// activate selected tab
			$( '.' + content ).addClass( 'active' );

			if ( options ) {
				$( '.nav-objectives' )
					.find( '.focus-title-' +  options.statestdid )
					.addClass( 'active' );
			}
		},

		'activateTitleTab' : function ( e ) {
			// remove class from current active title li
			$( '.nav-objectives' )
				.find( '.active' )
				.removeClass( 'active' );

			// activate title selected tab
			$( e.target.parentElement ).addClass( 'active' );
		}

	} );

} );
