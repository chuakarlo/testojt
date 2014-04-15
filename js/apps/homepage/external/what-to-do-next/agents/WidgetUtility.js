/**
 * WidgetUtility
 * @class
 * Manages other logic process that is common across what-to-do-next Section
 */
define ( function ( require ) {
	'use strict';

	var ApiCollection       = require( 'apps/homepage/external/what-to-do-next/agents/WidgetAPI' );

	var WidgetUtility = function () {
		this.userAPICollection = null;
	};

	WidgetUtility.prototype = {

		/**
		 * Assign the user API to this class
		 */
		'setWidgetAPICollection' : function( userAPICollection ) {
			this.userAPICollection = userAPICollection;
		},

		/**
		 * Perform operations in adding a model to the collection and fetch changes from the API.
		 * @params {Model} model Model of the widget to be added in the collection
		 * @params {Collection} collection Collection where the model is added
		 */
		'widgetCollectionAddAndFetch' : function ( model, collection, callback ) {

			if( !model || !collection ) {
				return;
			}

			collection.add( model );

			ApiCollection.saveAndFetchUserWidgets( model.attributes.id, true, function ( active, inactive ) {
				//no tracking of errors yet
				if( callback ) {
					callback ( active, inactive );
				}
			} );

		},

		/**
		 * Perform operations in adding a model and fetching it after the operation.
		 * This function is useful for retrieving active and inactive widgets and managing
		 * the inactive and active widget panes.
		 * @params {Model} model Model of the widget to be added in the collection
		 * @params {Collection} collection Collection where the model is added
		 */
		'widgetCollectionRemoveAndFetch' : function ( model, collection, callback ) {

			if( !model || !collection ) {
				return;
			}

			collection.remove( model );
			ApiCollection.saveAndFetchUserWidgets ( model.attributes.id, false, function ( active, inactive ) {
				//no tracking of errors yet

				if ( callback ) {
					callback ( active, inactive );
				}
			} );

		},

		/**
		 * Sort widgets by ID
		 */
		'sortWidgetsById' : function ( collection ) {

			var sortedCollection = collection.sortBy ( function ( widget) {
				return widget.id;
			} );

			return sortedCollection;
		},

	};

	return new WidgetUtility();

} );