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
			'click @ui.processStep'        : 'showProcessStep'
		},

		'_convertToTimeStamp' : function ( date ) {
			var newDate = new Date( date );
			return ( newDate.getTime() / 100 );
		},

		'setTaskStatus' : function ( model ) {
			var taskCompletedDate = this._convertToTimeStamp( model.get( 'CompleteByDate' ) );
			var mainCompletedDate = this._convertToTimeStamp( model.get( 'Tasks' )[ 0 ].CompleteByDate );

			model.get( 'Tasks' )[ 0 ].status      = 'Not Current';
			model.get( 'Tasks' )[ 0 ].statusColor = 'step-not-current';

			if ( taskCompletedDate <= mainCompletedDate || mainCompletedDate ) {
				model.get( 'Tasks' )[ 0 ].status   = 'Current';
				model.get( 'Tasks' )[ 0 ].statusColor   = 'step-current';
			}

			return model;
		},

		'setProcessStatusColor' : function ( model ) {
			model.statusColor = 'step-not-current';
			if ( model.get( 'ProcessStatus' ) === 'Current' || model.get( 'ProcessStatus' ) === '' ) {
				model.statusColor  = 'step-current';
			}

			return model;
		},

		'toggleDrawer' : function ( e ) {
			e.preventDefault();

			var toggleBtn     = $( e.currentTarget );
			var toggleContent = toggleBtn.siblings( '.lt-toggle-content' )[ 0 ];

			$( toggleBtn )
				.find( '.hide' )
				.removeClass( 'hide' );

			$( toggleContent ).slideToggle( 300 );
		},

		'showProcessStep' : function ( e ) {
			e.preventDefault();
			var self          = this;
			var processId     = self.model.get( 'ProcessId' );
			var processTaskId = e.currentTarget.attributes[ 0 ].nodeValue;

			self.trigger( 'lt:redirect', 'observation', 'observationProcessesOfMe', { 'processId' : processId, 'processTaskId' : processTaskId } );
		},

		templateHelpers : function () {
			var self = this;

			self.setProcessStatusColor ( self.model );
			self.setTaskStatus ( self.model );

			return self.model;
		}

	} );

} );
