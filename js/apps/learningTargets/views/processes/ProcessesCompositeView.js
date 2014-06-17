define( function ( require ) {
	'use strict';

	var Marionette    = require( 'marionette' );
	var Backbone      = require( 'backbone' );
	var template      = require( 'text!apps/learningTargets/templates/processes/process.html' );
	var TasksItemView = require( 'apps/learningTargets/views/processes/TasksItemView' );
	var EmptyView     = require( 'apps/learningTargets/views/processes/EmptyTask' );
	var _             = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'tagName'           : 'div',
		'itemView'          : TasksItemView,
		'emptyView'         : EmptyView,
		'className'         : 'lt-toggle-btn',
		'itemViewContainer' : '.lt-toggle-content',

		'ui'                : {
			'activateAccordion' : '.lt-accordion-tab'
		},

		'initialize' : function () {
			this.collection = new Backbone.Collection( this.model.get( 'Tasks' ) );
			return this;
		},
		'events' : {
			'click @ui.activateAccordion' : 'toggleAccordion'
		},

		'onRender' : function () {
			if ( this.collection.length === 0 ) {
				this.$el.find( '.lt-table-header' ).hide();
			}
		},

		'toggleAccordion' : function ( e ) {
			e.preventDefault();
			this.$el.toggleClass( 'active' );
			this.$el.find('.lt-title-holder').toggleClass( 'title-active' );
		}

	} );

} );
