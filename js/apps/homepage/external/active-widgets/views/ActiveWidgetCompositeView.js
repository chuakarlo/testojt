define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var template                  = require( 'text!apps/homepage/external/active-widgets/templates/activeWidgetCompositeView.html' );
	var ActiveWidgetItemComposite = require( 'apps/homepage/external/active-widgets/views/ActiveWidgetItemComposite' );

	function convert ( obj ) {
		return $.map( obj, function ( value, index ) {
			return [ value ];
		} );
	}

	return Marionette.CompositeView.extend( {
		'initialize'        : function ( options ) {
			this.widgetCollection = options.widgetCollection;
			this.collection       = new Backbone.Collection( convert( this.model.attributes ) );
		},
		'className'         : 'item',
		'template'          : _.template( template ),
		'itemView'          : ActiveWidgetItemComposite,
		'itemViewContainer' : '.row',
		'onShow'            : function () {
			this.$el.parent().find( '.item:first-child' ).addClass( 'active' );
		}
	} );
} );
