define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var EmptyView  = require( '../views/ContentNavigationCollectionEmptyView' );

	require( 'common/views' );

	return Marionette.CollectionView.extend( {

		'itemView' : App.Common.SegmentCardsView,

		'tagName' : 'ul',

		'emptyView' : EmptyView,

		'className' : 'segment-card-list',

		'itemViewOptions' : function ( model, index ) {
			var emptyViewOptions = {
				'className' : 'col-xs-12 col-sm-12'
			};

			var viewOptions = {
				'className' : 'col-xs-12 col-sm-6 col-md-4 col-lg-4'
			};

			var options = ( !model.get( 'UUVideoId' ) && !model.get( 'ContentId' ) ) ? emptyViewOptions : viewOptions;

			return options;
		}

	} );

} );
