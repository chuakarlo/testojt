define( function ( require ) {
	'use strict';

	require( 'slick' );

	var Marionette = require( 'marionette' );

	var VideoResourceItemView = require( 'videoPlayer/views/tabs/VideoResourceItemView' );
	var LoadingView           = require( 'videoPlayer/views/LoadingView' );

	return Marionette.CollectionView.extend( {

		'itemView'  : VideoResourceItemView,

		'tagName'   : 'ul',

		'className' : 'vid-tab',

		'emptyView' : LoadingView,

		'initialize' : function () {},

		'onClose' : function () {
			this.collection.reset( [] );
		}

	} );

} );
