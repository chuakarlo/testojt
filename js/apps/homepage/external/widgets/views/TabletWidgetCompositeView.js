define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var App      = require( 'App' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );

	var template                   = require( 'text!apps/homepage/external/widgets/templates/tabletWidgetCompositeView.html' );
	var TabletWidgetCollectionView = require( 'apps/homepage/external/widgets/views/TabletWidgetCollectionView' );
	var WidgetPreviewItemView      = require( 'apps/homepage/external/widgets/views/WidgetPreviewItemView' );

	var widgetAPI = function ( personnelId, widgetIds ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.core.WidgetGateway',
			'method' : 'addWidgetsByPersonnelId',
			'args'   : {
				'personnelId' : personnelId,
				'widgetIds'   : widgetIds
			}
		};
	};

	return Marionette.CompositeView.extend( {
		'initialize' : function ( options ) {
			var self = this;

			this.collection = new Backbone.Collection( { 'widgets' : this.collection } );
			App.vent.on( 'homepage:showWidgetPreview', function ( e ) {
				self.showWidgetPreview( e );
			} );
		},
		'events' : {
			'click #widget-settings-selection li'         : 'showWidgetPreview',
			'click .widget-icon-btn'                      : 'showWidgetPreview',
			'click #widget-settings-header li:not(.main)' : 'changeView',
			'click .cancel'                               : 'cancelAllChanges',
			'click .save'                                 : 'saveAll',
			'click .save-and-close'                       : 'saveAllandClose'
		},
		'template'          : _.template( template ),
		'itemView'          : TabletWidgetCollectionView,
		'itemViewContainer' : '#widget-settings-selection',
		'itemViewOptions' : function () {
			return {
				'widgetCollection'           : this.options.widgetCollection,
				'userWidgetCollection'       : this.options.userWidgetCollection,
				'actualUserWidgetCollection' : this.options.actualUserWidgetCollection
			};
		},

		'changeView' : function ( e ) {
			var headerBtn    = $( e.currentTarget );
			var selectedView = headerBtn.attr( 'id' );

			this.changeHeaderNav( headerBtn );
			App.vent.trigger( 'homepage:changeWidgetView', selectedView );
		},

		'cancelAllChanges' : function () {
			this.options.userWidgetCollection.reset( this.options.actualUserWidgetCollection.models );
			this.switchClass( $( '.widget-settings-icon' ), 'opened', 'closed' );
			this.closeWidgetSettingsPanel();
		},

		'saveAll' : function ( e ) {
			var currentWidgetView = this.$el.find( '.selected' ).attr( 'id' );

			this.options.actualUserWidgetCollection.reset( this.options.userWidgetCollection.models );
			this.updateUserWidgets();
			App.vent.trigger( 'homepage:changeWidgetView', currentWidgetView );
		},

		'saveAllandClose' : function () {
			this.options.actualUserWidgetCollection.reset( this.options.userWidgetCollection.models );
			this.updateUserWidgets();
			this.switchClass( $( '.widget-settings-icon' ), 'opened', 'closed' );
			this.closeWidgetSettingsPanel();
		},

		'updateUserWidgets' : function () {
			var self      = this;
			var widgetIds = this.pushWidgetIds();

			App.when( Remoting.fetch( widgetAPI( Session.personnelId(), widgetIds ) ) ).done( function () {
				self.showMessageToUser( App.Homepage.Utils.message.widgetChangeSave, 'success' );
			} ).fail( function ( error ) {
				self.showMessageToUser( App.Homepage.Utils.message.widgetSaveError, 'error' );
			} );
		},

		'pushWidgetIds' : function () {
			var widgetIds = [ ];
			this.options.actualUserWidgetCollection.models.forEach( function ( model ) {
				widgetIds.push( model.id );
			} );
			return widgetIds;
		},

		'showWidgetPreview' : function ( e ) {
			var widgetPreviewItemView = new WidgetPreviewItemView( {
				'model'                : this.getModelByClickEvent( e ),
				'userWidgetCollection' : this.options.userWidgetCollection
			} );

			this.$el.find( '#widget-settings-preview' ).html( widgetPreviewItemView.render().el );
		},

		'showMessageToUser' : function ( message, type ) {
			App.vent.trigger( 'flash:message', {
				'message' : message,
				'type'    : type
			} );
		},

		'changeHeaderNav' : function ( element ) {
			element.parent().find( '.selected' ).removeClass( 'selected' );
			element.addClass( 'selected' );
		},

		'getModelByClickEvent' : function ( e ) {
			var widgetId = $( e.currentTarget ).attr( 'data-id' );
			return this.collection.models[ 0 ].get( 'widgets' ).get( widgetId );
		},

		'switchClass' : function ( btn, oldClass, newClass ) {
			btn.removeClass( oldClass );
			btn.addClass( newClass );
		},

		'closeWidgetSettingsPanel' : function () {
			this.close();
		}
	} );

} );
