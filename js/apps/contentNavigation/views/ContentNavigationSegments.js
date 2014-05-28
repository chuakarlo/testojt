define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );

	require( 'common/views' );

	return Marionette.CollectionView.extend( {

		'itemView'  : App.Common.SegmentCardsView,
		'tagName'   : 'ul',
		'className' : 'segment-card-list',

		'itemViewOptions' : {
			'className' : 'col-xs-12 col-sm-6 col-md-4 col-lg-4'
		}

	} );

} );
