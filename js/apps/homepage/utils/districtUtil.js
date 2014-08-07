define( function ( require ) {
	'use strict';

	var _       = require( 'underscore' );
	var App     = require( 'App' );
	var Bugsnag = window.Bugsnag;

	var DistrictMessageView  = require( 'apps/homepage/views/DistrictMessageView' );
	var DistrictMessageModel = require( 'apps/homepage/entities/DistrictMessageModel' );

	return {
		'processDistrictMessage' : function ( layout ) {
			var ids = _.pluck( App.request( 'session:license' ), 'LicenseId' );

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

							// Verify the region exists prior to trying to show
							if ( layout.messageRegion ) {
								layout.messageRegion.show( districtMessageView );
							}
						}
					}
				},

				'error' : function ( error ) {
					// Call Bugsnag directly and don't notify the user
					Bugsnag.notifyException( error, 'DistrictMessageFetchError' );
				}

			} );
		}
	};
} );
