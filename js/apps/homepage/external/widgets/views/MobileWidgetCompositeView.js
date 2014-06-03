define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var App      = require( 'App' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );

	var template             = require( 'text!apps/homepage/external/widgets/templates/mobileWidgetCompositeView.html' );
	var MobileWidgetItemView = require( 'apps/homepage/external/widgets/views/MobileWidgetItemView' );

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
		'events' : {
			'change #widget-mobile-header select'                 : 'changeView',
			'click #widget-mobile-actions .cancel'                : 'cancelAllChanges',
			'click #widget-mobile-actions .mobile-save'           : 'saveAll',
			'click #widget-mobile-actions .mobile-save-and-close' : 'saveAllandClose'
		},
		'template'          : _.template( template ),
		'itemView'          : MobileWidgetItemView,
		'itemViewContainer' : '#widget-mobile-selection ul',
		'itemViewOptions' : function () {
			return {
				'userWidgetCollection'       : this.options.userWidgetCollection,
				'actualUserWidgetCollection' : this.options.actualUserWidgetCollection
			};
		},

		'ui' : {
			'widgetSelect' : '#widget-mobile-header select'
		},

		'changeView' : function ( e ) {
			var widgetSelectVal = $( e.currentTarget ).val();

			this.collection = this.getOptionCollection()[ widgetSelectVal ];
			this.render();
			this.selectOptionByValue( widgetSelectVal );
		},

		'cancelAllChanges' : function () {
			this.options.userWidgetCollection.reset( this.options.actualUserWidgetCollection.models );
			this.switchClass( $( '#mobile-widget-settings' ), 'opened', 'closed' );
			this.closeWidgetSettingsPanel();
		},

		'saveAll' : function () {
			this.options.actualUserWidgetCollection.reset( this.options.userWidgetCollection.models );
			this.updateUserWidgets();

			if ( !this.onAllWidgetsTab() ) {
				var widgetSelectVal = this.ui.widgetSelect.val();

				this.collection = this.getOptionCollection()[ widgetSelectVal ];
				this.render();
				this.selectOptionByValue( widgetSelectVal );
			}
		},

		'saveAllandClose' : function () {
			this.options.actualUserWidgetCollection.reset( this.options.userWidgetCollection.models );
			this.updateUserWidgets();
			this.switchClass( $( '#mobile-widget-settings' ), 'opened', 'closed' );
			this.closeWidgetSettingsPanel();
		},

		'getOptionCollection' : function () {
			return {
				'All Widgets' : this.options.widgetCollection,
				'Active'      : new Backbone.Collection( this.getWidgetsByStatus( true ) ),
				'Inactive'    : new Backbone.Collection( this.getWidgetsByStatus( false ) )
			};
		},

		'getWidgetsByStatus' : function ( status ) {
			var self = this;
			return this.options.widgetCollection.filter( function ( model ) {
				var data = self.options.actualUserWidgetCollection.get( model.get( 'WidgetId' ) );
				return ( typeof data !== 'undefined' ) === status;
			} );
		},

		'onAllWidgetsTab' : function () {
			return this.ui.widgetSelect.val() === 'All Widgets';
		},

		'selectOptionByValue' : function ( value ) {
			this.ui.widgetSelect.find( 'option[ value="' + value + '" ]' ).prop( 'selected', true );
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

		'showMessageToUser' : function ( message, type ) {
			App.vent.trigger( 'flash:message', {
				'message' : message,
				'type'    : type
			} );
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
