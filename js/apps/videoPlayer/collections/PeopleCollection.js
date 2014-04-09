define( function ( require ) {
	'use strict';

	var Backbone    = require( 'backbone' );
	var PersonModel = require( 'videoPlayer/models/PersonModel' );
	var Remoting    = require( 'Remoting' );

	return Backbone.Collection.extend( {

		'model' : PersonModel,

		'url' : 'com.schoolimprovement.pd360.dao.SearchService',

		'fetch' : function ( request, options ) {
			options = ( options || {} );
			request.path = this.url;

			var remotingFetch = Remoting.fetch( request );

			if ( options.success ) {
				remotingFetch.done( options.success );
			}

			if ( options.error ) {
				remotingFetch.fail( options.error );
			}

			return remotingFetch;
		}

	} );

} );
