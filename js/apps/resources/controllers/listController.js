define( function ( require ) {
	'use strict';

	var App = require( 'App' );
	var $   = require( 'jquery' );

	var ResourcesCompositeView = require( 'resources/views/ResourcesCompositeView' );

	require( 'resources/entities/Resources' );

	App.module( 'Resources.List', function ( List ) {

		List.Controller = {

			'listResources' : function () {

				// show a loading view while fetching data
				var loadingView = new App.Common.LoadingView();
				App.content.show( loadingView );

				var resourcesRequest = App.request( 'resource:entities' );

				$.when( resourcesRequest ).done( function ( resources ) {

					var ResourcesView = new ResourcesCompositeView( {
						'collection' : resources
					} );

					App.content.show( ResourcesView );

				} );

			}

		};

	} );

} );
