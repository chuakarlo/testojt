define( function ( require ) {
	'use strict';

	var Backbone       = require( 'backbone' );
	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var template       = require( 'text!apps/learningTargets/templates/legends/legends.html' );
	var LegendItemView = require( 'apps/learningTargets/views/legends/LegendItemView' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : LegendItemView,
		'itemViewContainer' : '.lt-legend-container',
		'tagName'           : 'div',
		'className'         : 'panel-group lt-legend',

		'initialize' : function ( ) {
			this.collection = new Backbone.Collection( this.options.legends );

			return this;
		}

	} );

} );
