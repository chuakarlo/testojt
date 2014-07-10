define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var EmptyView  = require( '../views/ContentNavigationCollectionEmptyView' );
	var ItemView   = require( '../views/ContentNavigationSegmentItemView' );

	return Marionette.CollectionView.extend( {

		'itemView' : ItemView,

		'tagName' : 'ul',

		'emptyView' : EmptyView,

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
