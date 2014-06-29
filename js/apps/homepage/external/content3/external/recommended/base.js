define( function ( require ) {
	'use strict';

	var $     = require( 'jquery' );
	var _     = require( 'underscore' );
	var App   = require( 'App' );

	var emptyRecommendedTemplate = require( 'text!apps/homepage/external/content3/external/recommended/templates/emptyRecommendedTemplate.html' );
	var Collection               = require( 'apps/homepage/external/content3/external/recommended/collections/RecommendedCollection' );

	// function getId ( model ) {
	// 	var ContentId = model.get( 'ContentId' );
	// 	return ContentId || model.get( 'UUVideoId' );
	// }

	function propagateCollection ( fetchedColl, allData ) {
		var innerFetchedColl = fetchedColl;
		if ( allData.contentMax !== 1 ) {
			var last      = allData.innerCollections.slice( -1 )[ 0 ];
			var remaining = allData.contentMax - last.length;
			if ( remaining !== 0 ) {
				last.add( innerFetchedColl.slice( 0, remaining) );
				innerFetchedColl = innerFetchedColl.slice( remaining + 1 );
			}
		}
		allData.add( App.Homepage.Utils.chunk( innerFetchedColl, allData.contentMax ) );
	}

	function postFetch ( allData, total, start ) {
		if ( start < total ) {
			var coll = new Collection();
			coll.alterData( start );
			coll.fetch({
				'success' : function ( collection ) {
					App.Homepage.Utils.proceedHomeAction( function () {
						var fetchedColl = collection.slice( 1 );
						var newLength = start + fetchedColl.length;
						$( '#recommended-count' ).html( newLength );

						propagateCollection( fetchedColl, allData[ 0 ] );
						propagateCollection( fetchedColl, allData[ 1 ] );
						propagateCollection( fetchedColl, allData[ 2 ] );
						propagateCollection( fetchedColl, allData[ 3 ] );

						postFetch( allData, total, newLength );
					} );
				},
				'error'   : function ( err ) {
					console.log( err );
				}
			});
		}
	}

	return {
		'id'           : 'recommended',
		'header'       : 'Recommended',
		'collection'   : Collection,
		'contentDesc'  : 'The Recommended section displays content the system suggests for you based on your user profile. To learn more about using the system, complete the Getting Started with PD 360 [or insert product name] Essentials online training.',
		'fetchLogic'   : function ( collection ) {
			var header = collection[ 0 ];

			// var ids = _.map( header.collection.queueCollection, function ( model ) {
			// 	return model.ContentId || model.UUVideoId;
			// } );

			App.reqres.setHandler( 'homepage:content:recommended:total', function () {
				return {
					'total' : collection.length > 0 ? header.get( 'numFound' ) : 0,
					'fetch' : collection.length - 1
				};
			} );

			return collection.slice( 1 );

			// var queuedModels = _.filter(
			// 	collection.models,
			// 	function ( model ) {
			// 		return _.contains( ids, getId( model ) );
			// 	}
			// );

			// collection.remove( queuedModels );
		},
		'EmptyMessage' : {
			'heading' : 'Videos can be added to Recommended videos by completing your profile.',
			'details' : _.template( emptyRecommendedTemplate )
		},
		'afterRender'  : function ( collection ) {
			var result = App.request( 'homepage:content:recommended:total' );
			$( '#recommended-count' ).html( result.fetch );

			postFetch( collection, result.total, 24 );
		}
	};
} );
