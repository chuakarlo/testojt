define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/processes/process.html' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
		'tagName' : 'li',
		'ui'        : {
			'drawerToggleButton'  : '.lt-toggle-btn'
		},

		'events' : {
			'click @ui.drawerToggleButton' : 'toggleDrawer'
		},

		'toggleDrawer' : function ( e ) {
			e.preventDefault();

			//var self      = this;
			var toggleBtn     = $( e.currentTarget );
			var toggleContent = toggleBtn.siblings( '.lt-toggle-content' )[ 0 ];

			$( toggleContent ).slideToggle( 300 );
		}

	} );

} );
