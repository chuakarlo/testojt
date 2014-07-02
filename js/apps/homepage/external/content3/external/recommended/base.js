define( function ( require ) {
	'use strict';

	var $     = require( 'jquery' );
	var _     = require( 'underscore' );
	var App   = require( 'App' );

	var emptyRecommendedTemplate = require( 'text!apps/homepage/external/content3/external/recommended/templates/emptyRecommendedTemplate.html' );
	var Collection               = require( 'apps/homepage/external/content3/external/recommended/collections/RecommendedCollection' );

	function propagateCollection ( fetchedColl, allData ) {
		var innerFetchedColl = fetchedColl;
		if ( allData.contentMax !== 1 ) {
			var last      = allData.innerCollections.slice( -1 )[ 0 ];
			var remaining = allData.contentMax - last.length;
			if ( remaining !== 0 ) {
				last.add( innerFetchedColl.slice( 0, remaining ) );
				innerFetchedColl = innerFetchedColl.slice( remaining + 1 );
			}
		}
		allData.add( App.Homepage.Utils.chunk( innerFetchedColl, allData.contentMax ) );
	}

	function postFetch ( allData, total, start, actual, queue ) {
		if ( start < total ) {
			var coll = new Collection();
			coll.alterData( start );
			coll.fetch( {
				'success' : function ( collection ) {
					App.Homepage.Utils.proceedHomeAction( function () {
						var proc = processResult( queue, collection );
						var fetchedColl = proc.coll;
						var newActual = actual + fetchedColl.length - proc.cuts;
						$( '#recommended-count' ).html( newActual );

						propagateCollection( fetchedColl, allData[ 0 ] );
						propagateCollection( fetchedColl, allData[ 1 ] );
						propagateCollection( fetchedColl, allData[ 2 ] );
						propagateCollection( fetchedColl, allData[ 3 ] );

						$( '#recommended .carousel .right.carousel-control' ).show();
					} );
				},
				'error'   : function ( err ) {
				}
			} );
		} else {
			$( '#recommended .carousel .right.carousel-control' ).hide();
			$( '#load-recommended' ).empty();
		}
	}

	function removeQueued ( ids, newCollection ) {
		if ( ids && ids.length > 0 ) {
			newCollection = $.grep( newCollection, function ( n, i ) {
				return !_.contains( ids, n.get( 'ContentId' ) || n.get( 'UUVideoId' ) );
			} );
		}
		return newCollection;
	}

	function processResult ( ids, collection ) {
		var newCollection = collection.slice( 1 );
		var oldCount = newCollection.length;
		return {
			'cuts' : oldCount - newCollection.length,
			'coll' : removeQueued( ids, newCollection )
		};
	}

	return {
		'id'           : 'recommended',
		'header'       : 'Recommended',
		'collection'   : Collection,
		'contentDesc'  : 'The Recommended section displays content the system suggests for you based on your user profile. To learn more about using the system, complete the Getting Started with PD 360 [or insert product name] Essentials online training.',
		'fetchLogic'   : function ( collection ) {
			var header = collection[ 0 ];

			var ids = _.map( header.collection.queueCollection, function ( model ) {
				return model.ContentId || model.UUVideoId;
			} );

			var proc = processResult( ids, collection );

			App.reqres.setHandler( 'homepage:content:recommended:total', function () {
				return {
					'total' : ( proc.coll.length > 0 ? header.get( 'numFound' ) : 0 ) - proc.cuts,
					'fetch' : proc.coll.length - 1 - proc.cuts,
					'queue' : ids
				};
			} );

			return proc.coll;
		},
		'EmptyMessage' : {
			'heading' : 'Videos can be added to Recommended videos by completing your profile.',
			'details' : _.template( emptyRecommendedTemplate )
		},
		'afterRender'  : function ( collection ) {

			var result = App.request( 'homepage:content:recommended:total' );
			if ( result.fetch < 0 ) {
				result.fetch = 0;
			}
			$( '#recommended-count' ).html( result.fetch );
		},
		'onLastNav'    :  function ( $carousel ) {
			$( '#load-recommended' ).html( '<img src="img/loading-bar.gif"/></div>' );
			var result = App.request( 'homepage:content:recommended:total' );
			var collection = App.request( 'homepage:content:recommended:carousel' );
			postFetch( collection, result.total, 24, result.fetch, result.queue );
		}
	};
} );
