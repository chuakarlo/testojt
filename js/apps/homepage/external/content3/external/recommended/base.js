define( function ( require ) {
	'use strict';

	var _ = require( 'underscore' );

	var emptyRecommendedTemplate = require( 'text!apps/homepage/external/content3/external/recommended/templates/emptyRecommendedTemplate.html' );

	function getId ( model ) {
		var ContentId = model.get( 'ContentId' );
		return ContentId || model.get( 'UUVideoId' );
	}

	return {
		'id'           : 'recommended',
		'header'       : 'Recommended',
		'collection'   : require( 'apps/homepage/external/content3/external/recommended/collections/RecommendedCollection' ),
		'contentDesc'  : 'The Recommended section displays content the system suggests for you based on your user profile. To learn more about using the system, complete the Getting Started with PD 360 [or insert product name] Essentials online training.',
		'fetchLogic'   : function ( collection ) {
			var header = collection.models[ 0 ];

			var ids = _.map( header.collection.queueCollection, function ( model ) {
				return model.ContentId || model.UUVideoId;
			} );

			collection.length = collection.length > 0 ? header.get( 'numFound' ) : 0;
			collection.models = collection.models.slice( 1 );

			var queuedModels = _.filter(
				collection.models,
				function ( model ) {
					return _.contains( ids, getId( model ) );
				}
			);

			collection.remove( queuedModels );
		},
		'EmptyMessage' : {
			'heading' : 'Videos can be added to Recommended videos by completing your profile.',
			'details' : _.template( emptyRecommendedTemplate )
		}
	};
} );
