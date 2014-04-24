define( function ( require ) {

	'use strict';

	var $				 = require( 'jquery' );
	var _                = require( 'underscore' );
	var Marionette       = require( 'marionette' );

	var filterItemView   = require( './FilterItemView' );
	var template         = require( 'text!../../templates/Filters/FilterCompositeViewTemplate.html' );

	var breakIndex       = 1;
	var filterListHeight = 0;

	return Marionette.CompositeView.extend( {

		'ui' : {
			'clearButton' : 'span[type=submit]'
		},

		'template'          : _.template( template ),
		'className'         : 'cn-filter',
		'itemView'          : filterItemView,
		'itemViewContainer' : '.cn-content-filter',

		'onBeforeItemAdded' : function( itemView ) {
			if ( this.options.data.splitColumn ) {

				var breakCount  = Math.ceil( ( this.collection.length / 2 ) );

				filterListHeight = breakCount * 35;

				if ( breakIndex === ( breakCount + 1 ) ) {
					itemView.$el.css( 'margin-top', ( breakCount * -35 ) );
					itemView.$el.addClass( 'right' );

				} else if ( breakIndex > breakCount ) {
					itemView.$el.addClass( 'right' );
				}

				breakIndex += 1;

			}
			else {

				breakIndex = 1;

			}

			if( this.options.id === 'cn-custom-content-filter' ) {
				if( itemView.model.collection.indexOf( itemView.model ) === 3 ) {
					//apply style on fourth filter
					itemView.$el.css( 'border-bottom', '1px solid black' );
					itemView.$el.css( 'padding-bottom', '10px' );
				}

				if( itemView.model.collection.indexOf( itemView.model ) === 4 ) {
					//apply style on fifth filter
					itemView.$el.css( 'padding-top', '10px' );
				}
			}
		},

		'onBeforeRender' : function () {
			this.template = _.template( template, this.options.data );

			return this;
		},

		'onRender' : function () {
			if ( !this.options.data.multiSelect ) {
				$( this.ui.clearButton ).hide();
				this.$el.find( 'div.cn-collapse-btn' ).hide();
			}
		}
	} );

} );