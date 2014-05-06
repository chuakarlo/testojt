define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Session    = require( 'Session' );
	var App        = require( 'App' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var Remoting = require( 'Remoting' );

	var WidgetCollection = require( 'apps/homepage/external/widgets/collections/WidgetCollection' );

	var UserWidgetCollectionView = require( 'apps/homepage/external/widgets/views/UserWidgetCollectionView' );
	var WidgetCompositeView      = require( 'apps/homepage/external/widgets/views/WidgetCompositeView' );
	var template                 = require( 'text!apps/homepage/external/widgets/templates/widgetLayoutView.html' );

	var panelStatuses = [ 'opened', 'closed' ];
	var widgets       = require( 'apps/homepage/external/widgets/manifest' )().splice(1);

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
			view.widgetCollection     = new WidgetCollection( widgets );
			view.userWidgetCollection = new WidgetCollection( view.getUserWidgetCollection( models[ 0 ] ) );

			var userWidgetCollectionView = new UserWidgetCollectionView( { 'collection' : view.userWidgetCollection } );
			view.userWidgets.show( userWidgetCollectionView );
		} );
	}

	function doShowWidgetSettingsPanel ( view, e ) {
		var panelBtn            = $( e.currentTarget );
		var widgetCompositeView = new WidgetCompositeView( {
			'collection'           : view.widgetCollection,
			'widgetCollection'     : view.widgetCollection,
			'userWidgetCollection' : view.userWidgetCollection
		} );
		view.widgetSettings.show( widgetCompositeView );
		view.changePanelStatus( panelBtn, panelStatuses[ 1 ], panelStatuses[ 0 ] );
	}

	function doCloseWidgetSettingsPanel ( view, e ) {
		var panelBtn = $( e.currentTarget );
		view.widgetSettings.close();
		view.changePanelStatus( panelBtn, panelStatuses[ 0 ], panelStatuses[ 1 ] );
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
			'click div#widget-settings.closed' : 'showWidgetSettingsPanel',
			'click div#widget-settings.opened' : 'closeWidgetSettingsPanel',
			'click div.actions .cancel'        : 'closeWidgetSettingsPanel'
		},
		'className' : 'widget-container',
		'template'  : _.template( template ),
		'regions'   : {
			'userWidgets'    : '#user-widgets #active-widgets',
			'widgetSettings' : '#widgets-settings-panel'
		},

		'showWidgetSettingsPanel' : function ( e ) {
			doShowWidgetSettingsPanel( this, e );
		},

		'closeWidgetSettingsPanel' : function ( e ) {
			doCloseWidgetSettingsPanel( this, e );
		},

		'changePanelStatus' : function ( btn, from, to ) {
			changePanelStatus( btn, from, to );
		},

		'getUserWidgetCollection' : function ( userWidgets ) {
			return getUserWidgetCollection( this, userWidgets );
		}
	} );

} );
