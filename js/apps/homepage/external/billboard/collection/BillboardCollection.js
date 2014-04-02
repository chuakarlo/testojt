define( function ( require ) {
	'use strict';

	var Backbone       = require( 'backbone' );
	var BillBoardModel = require( 'apps/homepage/external/billboard/model/BillboardModel' );
	var Remoting       = require( 'Remoting' );
	var $              = require( 'jquery' );

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

			$.when( fetchingModels ).done( function ( models ) {

				options.success( new Collection( models[0].concat(models[1]) ) );

			} ).fail( function ( error ) {
				// TODO: error handling
			} );
		}
	} );
} );
