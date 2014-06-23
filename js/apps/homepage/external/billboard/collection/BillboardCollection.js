define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	var schema         = require( 'apps/homepage/external/billboard/configuration/billboardSchema' );
	var BillBoardModel = require( 'apps/homepage/external/billboard/model/BillboardModel' );

	function billboardRequest ( typeId ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.core.CoverFlowGateway',
			'method' : 'getAllOnlyValidByCoverFlowTypeId',
			'args'   : {
				'typeId' : typeId
			}
		};
	}

	var Collection = Backbone.Collection.extend( {
		'model' : BillBoardModel
	} );

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {

			var fetchingModels = Remoting.fetch( [ billboardRequest(1), billboardRequest(2) ] );

			App.when( fetchingModels ).done( function ( models ) {

				var collection = $.extend( models[ 0 ], models[ 1 ] );
				var error = 'Billboard: empty data' ;

				App.Homepage.Utils.jsonVal( schema, collection, function ( err ) {
					error = err;
					if ( !err ) {
						options.success( new Collection( collection ) );
						return;
					}
					options.error( error );
				} );

			} ).fail( function ( error ) {
				App.vent.trigger( 'flash:message', {
					'message' : 'An error occurred getting billboard pictures. Please try again later.'
				} );
			} );

		}
	} );
} );
