define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var EmptyView  = require( '../views/CollectionEmptyView' );
	var template   = require( 'text!../templates/SegmentsCollectionView.html' );
	var _          = require( 'underscore' );
	require( 'common/views/SegmentCardsView' );

	return Marionette.CompositeView.extend( {

		'template' : _.template( template ),

		'itemView' : App.Common.SegmentCardsView,

		'tagName' : 'ul',

		'emptyView' : EmptyView,

		'className' : 'program-segments-list',

		'itemViewOptions' : function ( model, index ) {
			var emptyViewOptions = {
				'className' : 'col-xs-12 col-sm-12'
			};

			var viewOptions = {
				'className' : 'col-xs-12 col-sm-6 col-md-4 col-lg-3'
			};

			var options = ( !model.get( 'UUVideoId' ) && !model.get( 'ContentId' ) ) ? emptyViewOptions : viewOptions;

			return options;
		},

		'templateHelpers' : function () {
			return {
				'count' : this.collection.length
			};
		}

	} );

} );
