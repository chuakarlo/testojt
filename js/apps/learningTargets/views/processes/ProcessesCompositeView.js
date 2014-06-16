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
			'panelCollapse' : '.panel-collapse',
			'titleHolder'   : '.lt-title-holder'
		},

		'initialize' : function () {
			this.collection = new Backbone.Collection( this.model.get( 'Tasks' ) );

			return this;
		},

		'onRender' : function () {
			var self = this;

			if ( this.collection.length === 0 ) {
				this.$el.find( '.lt-table-header' ).hide();
			}

			this.ui.panelCollapse.on('show.bs.collapse', function () {
				self.$el.addClass( 'active' );
				self.ui.titleHolder.addClass( 'title-active' );
			} );

			this.ui.panelCollapse.on('hide.bs.collapse', function () {
				self.$el.removeClass( 'active' );
				self.ui.titleHolder.removeClass( 'title-active' );
			} );
		}

	} );

} );
