define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var template   = require( 'text!apps/homepage/external/content/external/your-queue/templates/queueHeaderView.html' );
	var _          = require( 'underscore' );

	return {
		'doSetHeader' : function () {
			return _.template( template, {
				'name' : App.request( 'homepage:userProfile' ).FirstName + '\'s'
			});
		},

		'doFetchLogic' : function ( collectionParam ) {
			return {
				'collection' : collectionParam,
				'count'      : collectionParam.length
			};
		}
	};
} );
