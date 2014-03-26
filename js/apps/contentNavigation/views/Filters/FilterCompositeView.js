define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var filterItemView = require( './FilterItemView' );
	var template       = require( 'text!../../templates/Filters/FilterCompositeViewTemplate.html' );

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
		},

		'onBeforeRender' : function () {
			this.template = _.template( template, this.options.data );

			return this;
		}
	} );

} );