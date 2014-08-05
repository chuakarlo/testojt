define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var EmptyView  = require( '../views/ContentNavigationCollectionEmptyView' );

	return Marionette.CollectionView.extend( {

		'tagName' : 'ul',

		'emptyView' : EmptyView,

		'itemView' : App.Common.SegmentCardsView,

		'className' : 'segment-card-list',

		'itemViewOptions' : function ( model, index ) {
			var emptyViewOptions = {
				'className' : 'col-xs-12 col-sm-12'
			};

			var viewOptions = {
				'className' : 'col-xs-12 col-sm-12 col-md-6 col-lg-4'
			};

			var options = ( !model.get( 'UUVideoId' ) && !model.get( 'ContentId' ) ) ? emptyViewOptions : viewOptions;

			return options;
		}

	} );

} );
