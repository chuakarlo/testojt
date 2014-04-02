/**
 * WidgetAPI
 * @class
 * This class primarily manage the WidgetAPI whose collection is pointing to a certain user set of
 * active widgets. A base widget should also be set in this class in order to filter the active and inactive
 * widget collection. Base Widget is the collection fetched from the manifest file.
 */
define ( function ( require ) {
	'use strict';


	var APICollection    = require( 'apps/homepage/external/what-to-do-next/collections/WidgetAPICollection' );
	var WidgetCollection = require( 'apps/homepage/external/what-to-do-next/collections/WidgetCollection' );
	var $                = require( 'jquery' );
	var NOT_FOUND        = -1;

	var WidgetAPI            = function () {
		this.APICollection      = new APICollection();
		this.widgetCollection   = null;
		this.inactiveCollection = new WidgetCollection();
		this.activeCollection   = new WidgetCollection();
	};

	WidgetAPI.prototype = {

		/**
		 * Set Base collection  - collection retrieved from manifest file
		 * @params {Collection} widgetCollection Base collection to be used in
		 *                      filtering collection.
		 */
		'setBaseCollection' : function ( widgetCollection ) {
			this.widgetCollection     = widgetCollection;
			this.widgetCollection.url = 'http://zubu.cloudapp.net:8889/widgets/';
		},

		/**
		 * Fetch collection from the API
		 * @params {Function} callback callback function for the callee
		 */
		'fetchCollection' : function ( callback ) {

			this.APICollection.fetch({
				'success' : function ( collection ) {

					//set model url to widget API for later use during saving
					collection.models[0].url = collection.url;
					//return first, expected that collection have only one model
					callback ( collection.models[0] );
				}
			} );
		},

		/**
		 * Get filtered collection of Inactive Widgets
		 * @params {Function} callback callback function for the callee
		 */
		'getInactiveCollection' : function ( callback ) {
			var that = this;
			this.inactiveCollection.reset();
			this.fetchCollection ( function ( model ) {

				that.filterCollection( model, function () {

					callback( that.inactiveCollection );

				} );
			} );
		},

		/**
		 * Get filtered collection of Active Widgets
		 * @params {Function} callback callback function for the callee
		 */
		'getActiveCollection' : function ( callback ) {

			var that = this;
			this.activeCollection.reset();
			this.fetchCollection ( function ( model ) {

				that.filterCollection( model, function () {

					callback( that.activeCollection );

				} );
			} );

		},

		/**
		 * Get active and inactive collections.
		 */
		'getFilterCollections' : function ( callback ) {

			var that = this;

			this.activeCollection.reset();
			this.inactiveCollection.reset();

			this.fetchCollection ( function ( model ) {

				that.filterCollection( model, function () {

					callback( that.activeCollection, that.inactiveCollection );
				} );
			} );
		},

		/**
		 * Filter process of collection. Separate active and inactive collections
		 * @params {Model}  modelUserWidgets Model object which contains the user's
		 *                  active widgets.
		 * @params {Function} callback callback function for the callee
		 */
		'filterCollection' : function ( modelUserWidgets, callback ) {

			//will probably need to change the code below
			var arWidget = modelUserWidgets.attributes.widgets;
			var that     = this;

			this.widgetCollection.forEach( function ( widget ) {

				if( widget.attributes &&
						widget.attributes.baseObject ) {
					var sId = widget.attributes.baseObject._id;
					if ( $.inArray( sId, arWidget ) !== NOT_FOUND ) {
						that.activeCollection.add( widget );
					} else {
						that.inactiveCollection.add( widget );
					}
				}

			} );

			callback();
		},

		/**
		 * Save new widget attribute of the active user.
		 */
		'saveUserWidgets' : function ( sWidget, bAdd , callback ) {
			this.fetchCollection ( function ( model ) {
				var arWidget = model.attributes.widgets;

				if( bAdd ){
					if( $.inArray( sWidget, arWidget) === NOT_FOUND ) {
						arWidget.push( sWidget );
					}
				} else {
					var nIndex = arWidget.indexOf( sWidget );
					arWidget.splice ( nIndex, 1);
				}

				model.save ( {
						'id'      : model.attributes.id,
						'widgets' : arWidget
					}, {
						//no checking yet
						'success' : function () {
							callback ();
						},
						'error' : function () {
							callback ( 'error' );
						}
				} );

			} );
		},

		'saveAndFetchUserWidgets' : function ( sWidgets, bAdd, callback ) {

			var that = this;
			this.saveUserWidgets( sWidgets, bAdd, function ( err ) {
				//no error checking yet
				that.getFilterCollections( function ( active, inactive ) {
					callback ( active, inactive );
				} );
			} );
		}

	};

	return new WidgetAPI();

} );