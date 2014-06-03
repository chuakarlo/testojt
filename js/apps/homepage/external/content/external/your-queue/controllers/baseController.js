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
				var newContentId = hasContentId ? contentId : model.get( 'UUVideoId' );

				model.set( 'id', newContentId );
				model.set( 'ContentId', newContentId  );
				model.set( 'queued', true );
				model.set( 'VideoTypeId', hasContentId ? 1 : 2 );
				model.set( 'fromHomepage', true );
			} );

			App.reqres.setHandler( 'homepage:queueCollection', function () {
				return collectionParam;
			} );

			return {
				'collection' : collectionParam,
				'count'      : collectionParam.length
			};
		}
	};
} );
