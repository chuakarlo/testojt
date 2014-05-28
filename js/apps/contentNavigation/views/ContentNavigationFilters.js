define( function ( require ) {
	'use strict';
	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var FilterItemView = require( '../views/ContentNavigationFilterItemView' );
	var template       = require( 'text!../templates/contentNavigationFiltersView.html' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'itemView'          : FilterItemView,
		'tagName'           : 'ul',
		'className'         : 'cn-content-filter',
		'onBeforeItemAdded' : function ( itemView ) {
			if ( this.options.splitColumn ) {
				var splitTreshold = Math.floor( this.collection.length / 2 );

				var modelIndex = this.collection.indexOf( itemView.model );

				if ( modelIndex >= splitTreshold ) {
					itemView.$el.addClass( 'right' ).css( 'margin-top', ( this.collection.length - modelIndex ) * -30 );
				}
			}
		}

	} );

} );
