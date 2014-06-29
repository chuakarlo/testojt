define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	function propagateCollection ( fetchedColl, allData ) {
		if ( allData.contentMax !== 1 ) {
			if ( allData.innerCollections ) {
				var last      = allData.innerCollections.slice( -1 )[ 0 ];
				var remaining = allData.contentMax - last.length;
				if ( remaining !== 0 ) {
					last.add( fetchedColl );
				} else {
					allData.add( new Backbone.Collection( [ fetchedColl ] ) );
				}
			} else {
				allData.add( new Backbone.Collection( [ fetchedColl ] ) );
			}
		}
	}

	// function popData ( id, allData ) {
	// 	var popped = false;
	// 	for ( var i = 0, length = allData.innerCollections.length; i < length; i++ ) {
	// 		if ( !popped ) {
	// 			if ( allData.innerCollections[ i ].get( id ) ) {
	// 				allData.innerCollections[ i ].remove( id );
	// 				popped = true;
	// 			}
	// 		}
	// 		if ( !allData.innerCollections ) {
	// 			break;
	// 		}
	// 		if ( popped ) {
	// 			if ( i + 1 < length ) {
	// 				var first = allData.innerCollections[ i + 1 ].first();
	// 				if ( first ) {
	// 					var top = first.attributes;
	// 					allData.innerCollections[ i ].add( top );
	// 					allData.innerCollections[ i + 1 ].remove( top.id );
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	// function popDataSingle ( id, allData ) {
	// 	for ( var i = 0, length = allData.innerCollections.length; i < length; i++ ) {
	// 		if ( allData.innerCollections[ i ].get( id ) ) {
	// 			allData.innerCollections[ i ].remove( id );
	// 		}
	// 	}
	// }

	function updateCount ( increment ) {
		var oldCount = App.request( 'homepage:content:queue:total' );
		$( '#your-queue-count' ).html( oldCount + increment );
		App.reqres.setHandler( 'homepage:content:queue:total', function () {
			return oldCount + increment;
		} );
	}

	App.vent.on( 'common:queued', function ( model ) {
		App.Homepage.Utils.proceedHomeAction( function () {
			if ( App.reqres.hasHandler( 'homepage:content:your-queue:carousel' ) ) {
				var allData = App.request( 'homepage:content:your-queue:carousel' );
				var newData = [ model.attributes ];
				propagateCollection ( newData, allData[ 0 ] );
				propagateCollection ( newData, allData[ 1 ] );
				propagateCollection ( newData, allData[ 2 ] );
				propagateCollection ( newData, allData[ 3 ] );

				updateCount( 1 );
			}
		} );
	} );

	App.vent.on( 'common:dequeued', function ( model ) {
		App.Homepage.Utils.proceedHomeAction( function () {
			if ( App.reqres.hasHandler( 'homepage:content:your-queue:carousel' ) ) {
				// var allData = App.request( 'homepage:content:your-queue:carousel' );
				// var id = model.get( 'id' );
				// popData( id, allData[ 0 ] );
				// popData( id, allData[ 1 ] );
				//popData( id, allData[ 2 ] );
				//popDataSingle( id, allData[ 3 ] );

				updateCount ( -1 );
			}
		} );
	} );

} );
