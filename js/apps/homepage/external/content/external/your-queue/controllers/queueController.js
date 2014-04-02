define( function ( require ) {
	'use strict';

	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );
	var $        = require( 'jquery' );

	function queueRequest ( ContentId, method ) {
		return {
			'path'       : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
			'objectPath' : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmark',
			'method'     : method,
			'args'       : {
				'PersonnelId' : Session.personnelId(),
				'ContentId'   : ContentId,
				'Created'     : 'August, 09 2011 21:02:32' //need server date
			}
		};
	}

	return {

		'doFetch' : function ( model, options, method ){
			var fetchingModels = Remoting.fetch( [ queueRequest( model.id, method) ] );
			$.when( fetchingModels ).done( function ( models ) {
				options.success();
			} ).fail( function ( error ) {
				options.error();
			} );
		}
	};
} );