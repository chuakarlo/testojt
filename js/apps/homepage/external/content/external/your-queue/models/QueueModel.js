define( function ( require ) {
	'use strict';

	var Backbone   = require( 'backbone' );
	var controller = require( 'apps/homepage/external/content/external/your-queue/controllers/queueController' );

	return Backbone.Model.extend( {
		'idAttribute' : 'ContentId',
		'sync' : function ( method, model, options ) {

			if ( method === 'delete' ) {
				controller.doFetch( model, options, 'deleteByObj');
			} else if ( method ==='update' ) {
				controller.doFetch( model, options, 'create');
			} else {
				return Backbone.sync( method, model, options );
			}
		}
	} );
} );