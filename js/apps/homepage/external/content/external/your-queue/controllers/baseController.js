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

			collectionParam.models.forEach( function ( model ) {
				var contentId    = model.get( 'ContentId' );
				var hasContentId = ( contentId && contentId !== 0 );

				model.set( 'id', hasContentId ? contentId : 0 );
				model.set( 'ContentId', hasContentId ? contentId : 0  );

				model.set( 'queued', true );
				model.set( 'VideoTypeId', hasContentId ? 1 : 2 );
			} );

			return {
				'collection' : collectionParam,
				'count'      : collectionParam.length
			};
		}
	};
} );
