define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Session    = require( 'Session' );
	var App        = require( 'App' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var Remoting = require( 'Remoting' );

	var WidgetCollection = require( 'apps/homepage/external/widgets/collections/WidgetCollection' );

	var UserWidgetCollectionView  = require( 'apps/homepage/external/widgets/views/UserWidgetCollectionView' );
	var WidgetCompositeView       = require( 'apps/homepage/external/widgets/views/WidgetCompositeView' );
	var MobileWidgetCompositeView = require( 'apps/homepage/external/widgets/views/MobileWidgetCompositeView' );
	var template                  = require( 'text!apps/homepage/external/widgets/templates/widgetLayoutView.html' );

	var panelStatuses = [ 'opened', 'closed' ];
	var widgets       = App.Homepage.Widgets.allWidgets().splice(1);

	//early load for performance
	require( 'pc-adjustablePeek' );

	function fetchingModels ( personnelId ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.core.WidgetGateway',
			'method' : 'getWidgetsByPersonnelId',
			'args'   : {
				'personnelId' : personnelId
			}
		};
	}

	function doInitialize ( view ) {
		App.when( Remoting.fetch( fetchingModels( Session.personnelId() ) ) ).done( function ( models ) {

			if ( App.request( 'homepage:isHomeRoute' ) ) {
				if ( !models || !models[ 0 ] || models[ 0 ].length === 0 ) {
					models[ 0 ] = [ { WidgetId : 5 }, { WidgetId : 4 }, { WidgetId : 2 } ];
				}

				view.widgetCollection           = new WidgetCollection( widgets );
				view.userWidgetCollection       = new WidgetCollection( view.getUserWidgetCollection( models[ 0 ] ) );
				view.actualUserWidgetCollection = new WidgetCollection( view.getUserWidgetCollection( models[ 0 ] ) );

				var userWidgetCollectionView = new UserWidgetCollectionView( { 'collection' : view.actualUserWidgetCollection } );
				view.userWidgets.show( userWidgetCollectionView );

				userWidgetCollectionView.collection.on( 'reset', function () {
					userWidgetCollectionView.$el.empty();
					view.userWidgets.close();
					view.userWidgets.show( userWidgetCollectionView );
				} );
			}

		} ).fail( function ( error ) {

			App.vent.trigger( 'flash:message', {
				'message' : App.Homepage.Utils.message.widgetSaveError
			} );

		} );
	}

	function changePanelStatus ( btn, from, to ) {
		btn.removeClass( from );
		btn.addClass( to );
	}

	function getUserWidgetCollection ( view, userWidgets ) {
		return userWidgets.filter( function ( userWidget ) {
			return view.widgetCollection.get( userWidget.WidgetId );
		} );
	}

	return Marionette.Layout.extend( {
		'initialize' : function () {
			doInitialize( this );
		},
		'events' : {
			// Displaying Widget Panel
			'click div#widget-settings.closed'         : 'showWidgetSettingsPanel',
			'click div#xs-widget-settings.closed'      : 'showMobileWidgetSettings',
			'click #mobile-awesomeness'                : 'showMobileWidgetSettings',
			'click #awesomeness'                       : 'showWidgetSettingsPanel',
			'click #placeholder-icon'                  : 'showWidgetSettingsPanel',

			// Closing Widget Panel
			'click div#widget-settings.opened'         : 'closeWidgetSettingsPanel',
			'click div#widget-settings-overlay'        : 'closeWidgetSettingsPanel',
			'click div#xs-widget-settings.opened'      : 'closeMobileSettingsPanel'
		},
		'className' : 'widget-container',
		'template'  : _.template( template ),
		'regions'   : {
			'userWidgets'          : '#user-widgets #active-widgets',
			'widgetSettings'       : '#widgets-settings-panel-wrapper',
			'mobileWidgetSettings' : '#xs-widgets-panel-wrapper'
		},

		'showWidgetSettingsPanel' : function () {
			var panelBtn            = $( '#widget-settings' );
			var widgetCompositeView = new WidgetCompositeView( {
				'collection'                 : this.widgetCollection,
				'widgetCollection'           : this.widgetCollection,
				'userWidgetCollection'       : this.userWidgetCollection,
				'actualUserWidgetCollection' : this.actualUserWidgetCollection
			} );
			this.widgetSettings.show( widgetCompositeView );
			this.changePanelStatus( panelBtn, panelStatuses[ 1 ], panelStatuses[ 0 ] );
			this.$el.find( '#widget-settings-overlay' ).show();
			$( '#widgets-settings-panel-wrapper' ).focus().css('outline', 'none');
		},

		'showMobileWidgetSettings' : function ( e ) {
			var panelBtn            = $( e.currentTarget );
			var widgetCompositeView = new MobileWidgetCompositeView( {
				'collection'                 : this.widgetCollection,
				'widgetCollection'           : this.widgetCollection,
				'userWidgetCollection'       : this.userWidgetCollection,
				'actualUserWidgetCollection' : this.actualUserWidgetCollection
			} );
			this.mobileWidgetSettings.show( widgetCompositeView );
			this.$el.find( '#widget-settings-overlay' ).show();
			this.changePanelStatus( panelBtn, panelStatuses[ 1 ], panelStatuses[ 0 ] );
		},

		'closeWidgetSettingsPanel' : function () {
			var panelBtn = $( '#widget-settings' );
			this.widgetSettings.close();
			this.$el.find( '#widget-settings-overlay' ).hide();
			this.changePanelStatus( panelBtn, panelStatuses[ 0 ], panelStatuses[ 1 ] );
		},

		'closeMobileSettingsPanel' : function ( e ) {
			var panelBtn = $( e.currentTarget );
			this.mobileWidgetSettings.close();
			this.changePanelStatus( panelBtn, panelStatuses[ 0 ], panelStatuses[ 1 ] );
		},

		'changePanelStatus' : function ( btn, from, to ) {
			changePanelStatus( btn, from, to );
		},

		'getUserWidgetCollection' : function ( userWidgets ) {
			return getUserWidgetCollection( this, userWidgets );
		},

		'blurAction' : function ( e ) {
			if ( $( '#widgets-settings-panel-wrapper' ).attr( 'data-bypass'  ) === 'off' ) {

				var elem = e.currentTarget.ownerDocument.activeElement;
				var parent = $( elem ).closest( '#widgets-settings-panel-wrapper' );

				//using jquery to get focus doesn't work in IE
				if ( parent.length === 1 ) {
					$( '#widgets-settings-panel-wrapper' ).focus().css('outline', 'none');
				} else {
					var self = this;
					self.userWidgetCollection.reset();

					self.actualUserWidgetCollection.models.forEach( function ( model ) {
						self.userWidgetCollection.add( model );
					} );
					$( 'div#widget-settings.opened' ).click();
				}

			} else {
				$( '#widgets-settings-panel-wrapper' ).attr( 'data-bypass', 'off' );
				$( '#widgets-settings-panel-wrapper' ).focus().css('outline', 'none');
			}
		},

		'focusAction' : function ( e ) {
			$( '#widgets-settings-panel-wrapper' ).focus().css('outline', 'none');
		}

	} );
} );
