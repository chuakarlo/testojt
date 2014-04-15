define( function ( require ) {
	'use strict';

	var Marionette                   = require( 'marionette' );
	var _                            = require( 'underscore' );
	var template                     = require( 'text!apps/homepage/external/what-to-do-next/templates/whatToDoNextLayoutView.html' );
	var WidgetCollectionView         = require( 'apps/homepage/external/what-to-do-next/views/WidgetCollectionView' );
	var InactiveWidgetCollectionView = require( 'apps/homepage/external/what-to-do-next/views/InactiveWidgetCollectionView' );
	var WidgetCollection             = require( 'apps/homepage/external/what-to-do-next/collections/WidgetCollection' );
	var manifest                     = require( 'apps/homepage/external/what-to-do-next/manifest' );
	var UIManager                    = require( 'apps/homepage/external/what-to-do-next/agents/UIManager' );
	var $                            = require( 'jquery' );

	var externalWidgets              = manifest;

	return Marionette.Layout.extend( {
		'initialize' : function ( options ) {
			if( options && options.model ) {
				var newOptions = options.model.get( 'baseObject' ).sharedData;
				this.collection               = new WidgetCollection( externalWidgets( newOptions ) );
				this.collection['sharedData'] = newOptions;
			}
		},
		'className' : 'col-md-12 no-padding',
		'events'    : {
			'click #widget-settings' : 'toggleInactiveWidgets'
		},
		'template' : _.template( template ),
		'regions'  : {
			'inactiveWidgets' : '#inactive-widgets',
			'activeWidgets'   : '#active-widgets'
		},
		'onRender' : function ( options ) {
			var widgetCollectionView = new WidgetCollectionView( { 'collection' : this.collection, 'inactive' : this.inactiveWidgets } );
			this.activeWidgets.show( widgetCollectionView );
			//var that = this;
			// require( [ 'jqueryui' ], function ( $ ) {
			// 	$(that.activeWidgets.currentView.$el).sortable( 'disable' );
			// } );
		},

		/**
		 * Toggle the display of inactive widget pane
		 */
		'toggleInactiveWidgets' : function ( options ) {

			var eWidgetBtn                   = $( '#widget-settings' );
			var eHolder                      = $( '#inactive-holder' );
			var eArrow                       = $( '.arrow-up' );
			var inactiveWidgetCollectionView = new InactiveWidgetCollectionView( { 'collection' : this.collection } );
			var that                         = this;

			//show widget pane at first call
			that.inactiveWidgets.show ( inactiveWidgetCollectionView  );

			eWidgetBtn.toggleClass( 'active' );
			eHolder.slideToggle('fast',  function () {

				var thisElem = that.activeWidgets.currentView.$el;
				var sActive =  eWidgetBtn.attr( 'class' );

				if( sActive === 'active' ) {
					//Inactive Widget Pane is Opened
					UIManager.enableDrag( thisElem );
					UIManager.showDeleteButtons( thisElem.find( 'li' ) );

				} else {

					//Inactive Widget Pane is Closed
					// require( [ 'jqueryui' ], function ( $ ) {
					// 	$( thisElem ).sortable( 'disable' );
					// } );
					//true - no checking conditions
					UIManager.removeDeleteButtons ( thisElem.find( 'li div.delete-widget'), true );
				}

			} );

			eArrow.toggle();
		}

	} );

} );