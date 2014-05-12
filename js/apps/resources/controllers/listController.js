define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	var ResourcesCompositeView = require( 'resources/views/ResourcesCompositeView' );

	require( 'resources/entities/Resources' );

	App.module( 'Resources.List', function ( List ) {

		List.Controller = {

			'listResources' : function () {
				var resourcesRequest = App.request( 'resource:entities' );

				// show a loading view while fetching data
				App.content.show( new App.Common.LoadingView() );

				App.when( resourcesRequest ).done( function ( resources ) {
					var ResourcesView = new ResourcesCompositeView( {
						'collection' : resources
					} );

					App.content.show( ResourcesView );

				} );

			}

		};

	} );

} );
