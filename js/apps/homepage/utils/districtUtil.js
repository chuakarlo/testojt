define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	var DistrictMessageView  = require( 'apps/homepage/views/DistrictMessageView' );
	var DistrictMessageModel = require( 'apps/homepage/entities/DistrictMessageModel' );

	return {
		'processDistrictMessage' : function ( layout ) {
			// Check to see if they have a district message
			var licenses = App.request( 'user:licenses' );
			App.when( licenses ).done( function ( licenses ) {

				var ids = licenses.pluck('LicenseId');
				var districtMessageModel = new DistrictMessageModel( {
					'licIds' : ids
				} );

				districtMessageModel.fetch( {

					'success' : function ( model ) {
						if ( App.request( 'homepage:isHomeRoute' ) ) {
							if ( model.isValidMessage() ) {
								var districtMessageView = new DistrictMessageView( {
									'model' : model
								} );
								layout.messageRegion.show( districtMessageView );
							}
						}
					}
				} );

			} ).fail( function ( error ) {

				layout.messageRegion.show( new App.Common.ErrorView( {
					'message' : 'There was an error getting district message.',
					'flash'   : 'An error occurred. Please try again later.'
				} ) );

			} );
		}
	};
} );
