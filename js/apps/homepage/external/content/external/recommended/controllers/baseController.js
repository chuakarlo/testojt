define( function ( require ) {
	'use strict';

	var App   = require( 'App' );

	var utils = require( 'apps/homepage/external/content/utils/contentItemCollectionUtil' );
	var $     = require( 'jquery' );
	var _     = require( 'underscore' );

	return {
		'doFetchLogic' : function ( collectionParam ) {

			var count = collectionParam.models[ 0 ].get( 'numFound' );

			collectionParam.models = collectionParam.models.slice( 1 );
			var qContentsIds = _.pluck( collectionParam.queueCollection, 'ContentId' );

			collectionParam.models.forEach( function ( model ) {
				var contentId    = model.get( 'ContentId' );
				var hasContentId = ( contentId && contentId !== 0 );
				var newContentId = hasContentId ? contentId : model.get( 'UUVideoId' );

				model.set( 'id', newContentId );
				model.set( 'ContentId', newContentId  );
				model.set( 'queued', _.contains( qContentsIds, model.id ) );
				model.set( 'fromHomepage', true );
			} );

			App.reqres.setHandler( 'homepage:recommendedCollection', function () {
				return collectionParam;
			} );

			return {
				'collection' : collectionParam,
				'count'      : count
			};
		},

		'doPreFetchLogic' : function ( options, callback ) {
			callback( options );
		},

		'doCarouselCustomAction' : function ( view, data, start, base ) {
			if ( start ) {
				$( '#recommended-wrapper .lazyload' ).append( '<div id="lazyload"><img src="img/loading-bar.gif"/></div>' );
				start = view.collection.length - 1;
				utils.collectionFetch( view, base, data, start, function ( collection ) {
					view.collection.add( collection.collection.models );
					$( '#recommended-wrapper ul' ).getActivePane( function ( activePane ) {
						view.render();
						$( '#recommended-wrapper ul' ).shiftOnPane( activePane );
					} );
					$( '#lazyload' ).remove();

				} );
			}
		}
	};
} );
