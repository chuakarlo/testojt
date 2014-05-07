define( function ( require ) {

	'use strict';

	var utils = require( 'apps/homepage/external/content/utils/contentItemCollectionUtil' );
	var $ = require( 'jquery' );

	return {
		'doFetchLogic' : function ( collectionParam ) {

			var count = collectionParam.models[ 0 ].get( 'numFound' );

			collectionParam.models = collectionParam.models.slice( 1 );

			return {
				'collection' : collectionParam,
				'count'      : count
			};
		},

		'doPreFetchLogic' : function ( options, callback ) {
			callback( options );
		},

		'doRenderToggle' : function ( collection, model ) {
			var toggleClass = 'add-to-queue';

			for ( var item in collection.queueCollection ) {
				if ( collection.queueCollection[ item ].ContentId === model.get( 'ContentId' ) ) {
					toggleClass = 'recommended-remove-from-queue';
					break;
				}
			}

			return toggleClass;
		},
		'doCarouselCustomAction' : function ( view, data, start, base ) {

			if ( start ) {
				$( '#recommended-wrapper ul' ).parent().append( '<div id="lazyload"><img src="img/loading-bar.gif"/></div>' );
				start = view.collection.length - 1;
				utils.collectionFetch( view, base, data, start, function ( collection ) {
					view.collection.add( collection.collection.models );
					view.render();
					$( '#recommended-wrapper ul' ).getActivePane( function ( activePane ) {
						$( '#recommended-wrapper ul' ).shiftOnPane( activePane );
					} );
					$( '#lazyload' ).remove();

				} );
			}
		}
	};
} );
