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
		'tagName'           : 'div',
		'itemView'          : TasksItemView,
		'emptyView'         : EmptyView,
		'className'         : 'lt-toggle-btn',
		'itemViewContainer' : '.lt-toggle-content',
		'ui'                : {
			'titleHolder'  : '.lt-title-holder',
			'titleHeader'  : '.lt-table-header',
			'anchorAccord' : '.lt-accordion-tab'
		},
		'originalState' : 'resources/learning/processes',
		'initialize' : function ( options ) {
			this.options = options;
			this.processIDString = this.model.get( 'ProcessId' ).toString();
			this.ui.panelCollapse = '#collapse' + this.processIDString;
			this.collection = new Backbone.Collection( this.model.get( 'Tasks' ) );
			return this;
		},
		'scrollToLast' : function () {
			var processID     = this.options.activeID[ 0 ];
			var processTaskID = this.options.activeID[ 1 ];
			var elem          = this.$( '.lt-process-' + processID + '-' + processTaskID );
			elem.css( 'color','black' );
			$( 'html, body' ).animate( {
				scrollTop : elem.offset().top - 200
			}, 1000 );
		},
		'checkIfActive' : function () {
			if ( this.options.activeID && this.processIDString === this.options.activeID[ 0 ] ) {
				this.scrollToLast();
			}
		},
		'onCompositeRendered' : function () {

			var self = this;

			if ( this.collection.length === 0 ) {
				this.ui.titleHeader.hide();
			}

			var activeIndex = this.options.process.indexOf( this.processIDString );
			if ( activeIndex > -1 ) {
				this.$el.addClass( 'active' );
				this.ui.titleHolder.addClass( 'title-active' );
				this.ui.panelCollapse.on( 'shown.bs.collapse', function () {
					self.checkIfActive();
					return false;
				} );
				this.ui.panelCollapse.collapse( 'show' );
			} else {
				// Prevents from scrolling up
				this.ui.panelCollapse.on( 'shown.bs.collapse', function () {
					return false;
				} );

			}

			this.ui.panelCollapse.on( 'show.bs.collapse', function ( event ) {
				self.$el.addClass( 'active' );
				self.ui.titleHolder.addClass( 'title-active' );
				self.changeURL();
			} );

			this.ui.panelCollapse.on( 'hide.bs.collapse', function () {
				self.$el.removeClass( 'active' );
				self.ui.titleHolder.removeClass( 'title-active' );
				self.changeURL();
			} );

		},

		'changeURL' : function () {
			var temp = Backbone.history.fragment.split( this.originalState );
			var res = temp[ 1 ].substr( 1, temp[ 1 ].length - 1 ).split( '/' );
			var params = res[ 0 ].split( '|' );
			params = _.filter( params, function ( n ) {
				return n;
			} );
			var index = params.indexOf( this.processIDString );
			if ( index > -1 ) {
				params.splice( index, 1 );
			} else {
				params.push( this.processIDString );
			}
			var path = '';
			if ( params.length > 0 ) {
				path += '/' + params.join( '|' );
			}
			Backbone.history.navigate( this.originalState + path , { trigger : false } );
		}

	} );

} );
