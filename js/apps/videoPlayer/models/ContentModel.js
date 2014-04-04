define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );

	return Backbone.Model.extend( {

		'url' : 'com.schoolimprovement.pd360.dao.ContentService',

		'idAttribute' : 'ContentId',

		'initialize' : function () {},

		'fetch' : function ( request, options ) {
			options      = options || {};
			request.path = this.url;

			return Remoting.fetch( request );
		}

	} );

} );
