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

		// Target active carousel as we are manipulating position
		var sViewPort = App.Homepage.Utils.getActiveView();
		App.Homepage.Utils.addLeftOnNewItems( $( '#recommended-pd360-slide-' + sViewPort ) );
	}

	function postFetch ( allData ) {
		var result = App.request( 'homepage:content:recommended:total' );
		if ( result.start < result.total ) {
			var coll = new Collection();
			coll.alterData( result.start );
			coll.fetch( {
				'success' : function ( collection ) {
					App.Homepage.Utils.proceedHomeAction( function () {
						var proc = processResult( result.queue, collection );
						var fetchedColl = proc.coll;
						var newActual = result.fetch + fetchedColl.length - proc.cuts;

						App.reqres.setHandler( 'homepage:content:recommended:total', function () {
							return {
								'total' : result.total,
								'fetch' : newActual,
								'queue' : result.queue,
								'start' : result.start + 24
							};
						} );

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
			newCollection.forEach( function ( rows ) {
				if ( _.contains( ids, rows.get( 'ContentId' ) || rows.get( 'UUVideoId' ) ) ) {
					rows.set( 'queued', true );
				}
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
		'id'         : 'recommended',
		'header'     : 'Recommended',
		'collection' : Collection,

		'tooltip' : function () {

			var personnel = App.request( 'session:personnel' );

			var params = {
				'email'       : personnel.EmailAddress,
				'fname'       : personnel.FirstName,
				'lname'       : personnel.LastName,
				'personnelid' : personnel.PersonnelId
			};

			var helpUrl = 'http://help.schoolimprovement.com/courses/essentials/#context/' + $.param( params );

			return 'The Recommended section displays content the system suggests for you based on your user profile. To learn more about using the system, complete the <a href="' + helpUrl + '">Edivation Essentials online training</a>.';
		},

		'fetchLogic' : function ( collection ) {
			var header = collection[ 0 ];

			var ids = _.map( header.collection.queueCollection, function ( model ) {
				return model.ContentId || model.UUVideoId;
			} );

			var proc = processResult( ids, collection );

			App.reqres.setHandler( 'homepage:content:recommended:total', function () {
				return {
					'total' : header.get( 'numFound' ),
					'fetch' : proc.coll.length - proc.cuts,
					'queue' : ids,
					'start' : 24
				};
			} );

			return proc.coll;
		},

		'EmptyMessage' : {
			'heading' : 'Videos can be added to Recommended videos by completing your profile.',
			'details' : _.template( emptyRecommendedTemplate )
		},

		'afterRender' : function ( collection ) {

			var result = App.request( 'homepage:content:recommended:total' );
			if ( result.fetch < 0 ) {
				result.fetch = 0;
			}
			$( '#recommended-count' ).html( result.total );
		},

		'onLastNav' : function ( $carousel ) {
			$( '#load-recommended' ).html( '<img src="img/loading-bar.gif"/></div>' );
			var collection = App.request( 'homepage:content:recommended:carousel' );
			postFetch( collection );
		}
	};
} );
