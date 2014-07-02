define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var App        = require( 'App' );
	var Remoting   = require( 'Remoting' );
	var Session    = require( 'Session' );

	var template                   = require( 'text!apps/homepage/external/active-widgets/templates/activeWidgetLayoutView.html' );
	var UserWidgetCollection       = require( 'apps/homepage/external/active-widgets/collections/UserWidgetCollection' );
	var ActiveWidgetCollectionView = require( 'apps/homepage/external/active-widgets/views/ActiveWidgetCollectionView' );
	var widgetDefaultLength        = 3;
	var widgets;

	var slideNavsData = {
		'largeWidget'  : {
			'size' : 'lg'
		},
		'mediumWidget' : {
			'size' : 'md-sm'
		},
		'smallWidget'  : {
			'size' : 'xs'
		}
	};

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

				widgets = App.Homepage.Widgets.allWidgets().splice( 1 );
				if ( !models || models.length < 0 ) {
					models[ 0 ] = [ ];
				}
				App.Homepage.Utils.jsonVal( function ( err ) {
					if ( err ) {
						models[ 0 ] = [ { WidgetId : 5 }, { WidgetId : 4 }, { WidgetId : 2 } ];
					}

					var userWidgets = appendEmptyIds( models[ 0 ] );
					displayAllRegions( view, userWidgets );

				}, {
					'schema' : require( 'text!apps/homepage/external/active-widgets/configuration/widgetSchema.json' ),
					'data'   : models[ 0 ]
				} );
			}

		} ).fail( function ( error ) {

			App.vent.trigger( 'flash:message', {
				'message' : App.Homepage.Utils.message.widgetSaveError
			} );

		} );
	}

	function appendEmptyIds ( widgets ) {
		var emptyWidgets = widgetDefaultLength - widgets.length;
		var radix        = 10;

		for ( var i = 1; i <= emptyWidgets; i++ ) {
			widgets.push( { 'WidgetId' : parseInt( '-' + i, radix ) } );
		}
		return widgets;
	}

	function displayAllRegions ( view, userWidgets ) {
		var largeUserWidgetCollection  = new UserWidgetCollection( largeChunkedWidgets( userWidgets ) );
		var mediumUserWidgetCollection = new UserWidgetCollection( mediumChunkedWidgets( userWidgets ) );
		var smallWidgetCollection      = new UserWidgetCollection( smallChunkedWidgets( userWidgets ) );

		showAll( view, 'largeWidget', largeUserWidgetCollection );
		showAll( view, 'mediumWidget', mediumUserWidgetCollection );
		showAll( view, 'smallWidget', smallWidgetCollection );
	}

	function showAll ( view, region, userWidgetCollection, widgetCollection ) {
		userWidgetCollection.widgetSize = slideNavsData[ region ].size;
		var activeWidgetCompositeView   = new ActiveWidgetCollectionView( {
			'collection' : userWidgetCollection
		} );

		view[ region ].show( activeWidgetCompositeView );

		App.vent.on( 'homepage:renderActiveWidgets', function () {
			view.initialize();
		} );
	}

	function largeChunkedWidgets ( widgets ) {
		return [
			[ widgets[ 0 ], widgets[ 1 ], widgets[ 2 ] ]
		];
	}

	function mediumChunkedWidgets ( widgets ) {
		return [
			[ widgets[ 0 ], widgets[ 1 ] ],
			[ widgets[ 1 ], widgets[ 2 ] ]
		];
	}

	function smallChunkedWidgets ( widgets ) {
		return [
			[ widgets[ 0 ] ],
			[ widgets[ 1 ] ],
			[ widgets[ 2 ] ]
		];
	}

	return Marionette.Layout.extend( {
		'initialize' : function ( options ) {
			doInitialize( this );
		},
		'template'   : _.template( template ),
		'regions'    : {
			'largeWidget'  : '#active-widgets-container.visible-lg .carousel.slide',
			'mediumWidget' : '#active-widgets-container.visible-md.visible-sm .carousel.slide',
			'smallWidget'  : '#active-widgets-container.visible-xs .carousel.slide'
		}
	} );
} );
