define( function ( require ) {
	'use strict';

	var Backbone       = require( 'backbone' );
	var Remoting       = require( 'Remoting' );
	var App            = require( 'App' );
	var $              = require( 'jquery' );
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

				App.Homepage.Utils.jsonVal( function ( err ) {
					if ( !err ) {
						options.success( new Collection( collection ) );
					} else {
						options.error( err );
					}
				}, {
					'schema' : require( 'text!apps/homepage/external/billboard/configuration/billboardSchema.json' ),
					'data'   : collection
				} );

			} ).fail( function ( error ) {
				App.vent.trigger( 'flash:message', {
					'message' : 'An error occurred getting billboard pictures. Please try again later.'
				} );
			} );

		}
	} );
} );
