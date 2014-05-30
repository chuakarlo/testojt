define( function ( require ) {
	'use strict';
	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var Vent           = require( 'Vent' );
	var FilterItemView = require( '../views/ContentNavigationFilterItemView' );
	var template       = require( 'text!../templates/contentNavigationFiltersView.html' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'itemView'          : FilterItemView,
		'itemViewContainer' : '.cn-filter-list',
		'className'         : 'cn-header-filter',

		'ui' : {
			'clearButton' : '.cn-clear-btn',
			'filter'      : '.cn-filter-item'
		},

		'events' : {
			'click @ui.clearButton' : 'clearFilters',
			'click @ui.filter'      : 'changeClear'
		},

		'changeClear' : function () {
			if ( !this.$el.find( 'li' ).hasClass( 'selected' ) ) {
				this.$el.find( '.cn-clear-btn' ).attr( 'disabled', 'disabled' );
			} else {
				this.$el.find( '.cn-clear-btn' ).removeAttr( 'disabled' );
			}
		},

		'clearFilters' : function ( e ) {
			e.preventDefault();

			this.$el.find( 'li' ).removeClass( 'selected' );
			this.$el.find( '.cn-clear-btn' ).attr( 'disabled', 'disabled' );
			Vent.trigger( 'contentNavigation:pd360:clearFilters', this.collection );
		},

		'onBeforeItemAdded' : function ( itemView ) {
			if ( this.options.splitColumn ) {
				var splitTreshold = Math.floor( this.collection.length / 2 );

				var modelIndex = this.collection.indexOf( itemView.model );

				if ( modelIndex >= splitTreshold ) {
					itemView.$el.addClass( 'right' ).css( 'margin-top', ( this.collection.length - modelIndex ) * -30 );
				}
			}
		},

		'onBeforeRender' : function () {
			this.options.split = '';
			if ( this.options.splitColumn ) {
				this.options.split = ' cn-split-filter';
			}

			this.template = _.template( template, this.options );

			return this;
		}

	} );

} );
