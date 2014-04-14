/*global Enumerable:false */
define( function ( require ) {
	'use strict';

	var Collection = require( 'apps/homepage/external/content/external/recommended/collections/RecommendedCollection' );

	return {
		'doFetchLogic' : function ( collectionParam ) {
			var collectionRaw = collectionParam.models[0];
			var CollectionPar = new Collection(collectionRaw.get('VIDEOS'));

			CollectionPar.models = Enumerable
			.From(CollectionPar.models)
			.Select(function (obj) {
					obj.attributes.sharedData = collectionRaw.get('sharedData');
					obj.attributes.renderToggle = collectionRaw.get('renderToggle');
					return obj;
			} )
			.ToArray();
			CollectionPar.queueCollection = collectionParam.queueCollection;

			return {
				'collection' : CollectionPar,
				'count'      : collectionRaw.get('RESULTS').SCORING.numFound
			};
		},

		'doPreFetchLogic' : function ( options, callback ) {
			callback( options );
		},

		'doRenderToggle' : function( collection, model ) {
			var toggleClass = 'add-to-queue';

			for(var item in collection.queueCollection){
				if(collection.queueCollection[item].ContentId === model.get('ContentId') ){
					toggleClass = 'remove-from-queue';
					break;
				}
			}

			return toggleClass;
		}
	};
} );