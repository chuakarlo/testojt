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
	var panelStatuses             = [ 'opened', 'closed' ];
	var widgetsLayoutUtils        = require( 'apps/homepage/external/widgets/utils/widgetLayoutUtils' );
	var widgets;

	// early load for performance

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

	function setDefaults () {
		return [ { WidgetId : 5 }, { WidgetId : 4 }, { WidgetId : 2 } ];
	}

	function doInitialize ( view ) {
		App.when( Remoting.fetch( fetchingModels( Session.personnelId() ) ) ).done( function ( models ) {

			if ( App.request( 'homepage:isHomeRoute' ) ) {

				widgets    = App.Homepage.Widgets.allWidgets().splice( 1 );
				if ( !models || models.length < 1 || !models[ 0 ] || models[ 0 ].length < 1 ) {
					models[ 0 ] = setDefaults();
				}
				App.Homepage.Utils.jsonVal( function ( err ) {
					if ( err ) {
						models[ 0 ] = setDefaults();
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

				}, {
					'schema' : require( 'text!apps/homepage/external/widgets/configuration/widgetSchema.json' ),
					'data'   : models[ 0 ]
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
			'click div#xs-widget-settings.opened'      : 'closeMobileSettingsPanel',

			// Slide
			'click #widget-nav.left'                   : 'slideLeft',
			'click #widget-nav.right'                  : 'slideRight'
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
			$( '#widgets-settings-panel-wrapper' ).focus().css( 'outline', 'none' );
		},

		'showMobileWidgetSettings' : function () {
			var panelBtn            = $( '#xs-widget-settings' );
			var widgetCompositeView = new MobileWidgetCompositeView( {
				'collection'                 : this.widgetCollection,
				'widgetCollection'           : this.widgetCollection,
				'userWidgetCollection'       : this.userWidgetCollection,
				'actualUserWidgetCollection' : this.actualUserWidgetCollection
			} );
			this.mobileWidgetSettings.show( widgetCompositeView );
			this.changePanelStatus( panelBtn, panelStatuses[ 1 ], panelStatuses[ 0 ] );
			this.$el.find( '#widget-settings-overlay' ).show();
		},

		'closeWidgetSettingsPanel' : function () {
			var panelBtn = $( '#widget-settings' );
			this.userWidgetCollection.reset( this.actualUserWidgetCollection.models );
			this.widgetSettings.close();
			this.$el.find( '#widget-settings-overlay' ).hide();
			this.changePanelStatus( panelBtn, panelStatuses[ 0 ], panelStatuses[ 1 ] );
		},

		'closeMobileSettingsPanel' : function ( e ) {
			var panelBtn = $( '#xs-widget-settings' );
			this.userWidgetCollection.reset( this.actualUserWidgetCollection.models );
			this.mobileWidgetSettings.close();
			this.$el.find( '#widget-settings-overlay' ).hide();
			this.changePanelStatus( panelBtn, panelStatuses[ 0 ], panelStatuses[ 1 ] );
		},

		'changePanelStatus' : function ( btn, from, to ) {
			changePanelStatus( btn, from, to );
		},

		'getUserWidgetCollection' : function ( userWidgets ) {
			return getUserWidgetCollection( this, userWidgets );
		},

		'focusAction' : function ( e ) {
			$( '#widgets-settings-panel-wrapper' ).focus().css( 'outline', 'none' );
		},

		'onRender' : function () {
			this.$el.find( '#widget-nav.right' ).show();
		},

		'onShow' : function () {
			var self        = this;
			var scrollElmnt = this.$el.find( '#active-widgets' );

			scrollElmnt.scroll( function () {
				var scrollLeft = $( this ).scrollLeft();
				widgetsLayoutUtils.doScrollLeft( scrollLeft, self );
			} );

			// This lets the home controller know this view is ready to display
			// the bootstro element
			App.vent.trigger( 'bootstro:itemLoaded' );

		},

		'slideLeft' : function ( e ) {
			e.preventDefault();

			var position = this.slidePosition( [ 580, 0, 290 ] );

			this.$el.find( '#active-widgets' ).animate( {
				'scrollLeft' : position
			}, 'slow' );
			return false;
		},

		'slideRight' : function ( e ) {
			e.preventDefault();

			var position = this.slidePosition( [ 290, 580, 0 ] );

			this.$el.find( '#active-widgets' ).animate( {
				'scrollLeft' : position
			}, 'slow' );
			return false;
		},

		'slidePosition' : function ( positionParam ) {

			var scrollLeft = this.$el.find( '#active-widgets' ).scrollLeft();
			var position = 0;

			if ( Math.abs( scrollLeft ) < 290 ) {
				position = positionParam[ 0 ];
			} else if ( Math.abs( scrollLeft ) >= 290 && Math.abs( scrollLeft ) < 580 ) {
				position = positionParam[ 1 ];
			} else {
				position = positionParam[ 2 ];
			}

			return position;
		}

	} );
} );
