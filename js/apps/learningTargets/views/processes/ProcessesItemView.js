define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/processes/process.html' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),
		'tagName'  : 'li',
		'ui'       : {
			'drawerToggleButton' : '.lt-toggle-btn',
			'linkBtn'            : '.lt-link',
			'processStep'        : '.lt-process-step'
		},

		'events' : {
			'click @ui.drawerToggleButton' : 'toggleDrawer',
			'click @ui.linkBtn'            : 'showLegacyApp',
			'click @ui.processStep'        : 'showProcessStep'
		},

		'toggleDrawer' : function ( e ) {
			e.preventDefault();

			var toggleBtn     = $( e.currentTarget );
			var toggleContent = toggleBtn.siblings( '.lt-toggle-content' )[ 0 ];

			$( toggleContent ).slideToggle( 300 );

		},

		'showLegacyApp' : function ( e ) {
			e.preventDefault();
			var self = this;

			self.trigger( 'lt:redirect', 'observation', 'observationProcessesOfMe', {
				'soughtProcessId' : self.model.get( 'ProcessId' )
			} );
		},

		'showProcessStep' : function ( e ) {
			e.preventDefault();
			var self          = this;
			var processId     = self.model.get( 'ProcessId' );
			var processTaskId = e.currentTarget.attributes[ 0 ].nodeValue;

			self.trigger( 'lt:redirect', 'observation', 'observationProcessesOfMe', { 'processId' : processId, 'processTaskId' : processTaskId } );
		}

	} );

} );
