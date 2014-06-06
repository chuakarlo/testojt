define( function ( require ) {
	'use strict';

	var Marionette    = require( 'marionette' );
	var Backbone      = require( 'backbone' );
	var template      = require( 'text!apps/learningTargets/templates/processes/process.html' );
	var TasksItemView = require( 'apps/learningTargets/views/processes/TasksItemView' );
	var EmptyView     = require( 'apps/learningTargets/views/processes/EmptyTask' );
	var _             = require( 'underscore' );
	var $             = require( 'jquery' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'tagName'           : 'li',
		'itemView'          : TasksItemView,
		'emptyView'         : EmptyView,
		'itemViewContainer' : '.lt-toggle-content',

		'ui'                : {
			'drawerToggleButton' : '.lt-toggle-btn',
			'linkBtn'            : '.lt-link',
			'processStep'        : '.lt-process-step'
		},
		'initialize' : function () {
			this.collection = new Backbone.Collection( this.model.get( 'Tasks' ) );
			return this;
		},
		'events' : {
			'click @ui.drawerToggleButton' : 'toggleDrawer',
			'click @ui.processStep'        : 'showProcessStep'
		},

		'toggleDrawer' : function ( e ) {
			e.preventDefault();

			var toggleBtn     = $( e.currentTarget );
			var toggleContent = toggleBtn.siblings( '.lt-toggle-content' )[ 0 ];

			$( toggleBtn ).toggleClass( 'active' );

			$( toggleContent ).slideToggle( 300 );
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
