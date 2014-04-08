define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );

	return Backbone.Model.extend( {

		'url' : {
			'ContentService' : 'com.schoolimprovement.pd360.dao.ContentService',
			'RespondService' : 'com.schoolimprovement.pd360.dao.RespondService'
		},
			
		'idAttribute' : 'ContentId',

		'initialize' : function () {},

		'fetch' : function ( request ) {
			request.path = this.url.ContentService;
			return Remoting.fetch( request );
		},
		
		'update' : function ( request ) {
			request.path = this.url.RespondService;
			return Remoting.fetch( request );
		}
	} );
} );
