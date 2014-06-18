define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var _          = require( 'underscore' );

	var App = require( 'App' );

	var TabletWidgetItemView  = require( 'apps/homepage/external/widgets/views/TabletWidgetItemView' );

	return Marionette.CollectionView.extend( {
		'initialize' : function ( options ) {
			var self = this;
			this.collection = this.model.get( 'widgets' );

			App.vent.on( 'homepage:changeWidgetView', function ( selectedView ) {
				self[ 'show' + selectedView + 'Widgets' ]( selectedView );
			} );
		},
		'events' : {
			'click .widget-icon-btn' : 'reRenderView'
		},
		'tagName'  : 'ul',
		'template' : _.template( 'template' ),
		'itemView' : TabletWidgetItemView,
		'itemViewOptions' : function () {
			return {
				'userWidgetCollection'       : this.options.userWidgetCollection,
				'actualUserWidgetCollection' : this.options.actualUserWidgetCollection
			};
		},

		'showAllWidgets' : function ( selectedView ) {
			this.changeView( selectedView );
		},

		'showActiveWidgets' : function ( selectedView ) {
			this.changeView( selectedView );
		},

		'showInactiveWidgets' : function ( selectedView ) {
			this.changeView( selectedView );
		},

		'changeView' : function ( widgetView ) {
			this.collection = this.getOptionCollection()[ widgetView ];
			this.render();
		},

		'getOptionCollection' : function () {
			return {
				'All'      : this.options.widgetCollection,
				'Active'   : new Backbone.Collection( this.getOrderedActiveWidgets() ),
				'Inactive' : new Backbone.Collection( this.getWidgetsByStatus( false ) )
			};
		},

		'getWidgetsByStatus' : function ( status ) {
			var self = this;
			return this.options.widgetCollection.filter( function ( model ) {
				var data = self.options.actualUserWidgetCollection.get( model.get( 'WidgetId' ) );
				return ( typeof data !== 'undefined' ) === status;
			} );
		},

		'getOrderedActiveWidgets' : function () {
			var self          = this;
			var activeWidgets = [ ];
			this.options.actualUserWidgetCollection.models.forEach( function ( model ) {
				activeWidgets.push( self.options.widgetCollection.get( model.id ) );
			} );
			return activeWidgets;
		},

		'reRenderView' : function () {
			this.render();
		}
	} );

} );
