define( function ( require ) {
	'use strict';

	var Marionette            = require( 'marionette' );
	var VideoResourceItemView = require( 'videoPlayer/views/tabs/VideoResourceItemView' );
	var NoItemView            = require( 'videoPlayer/views/NoItemView' );

	return Marionette.CollectionView.extend( {

		'itemView'  : VideoResourceItemView,

		'tagName'   : 'ul',

		'className' : 'row',

		'emptyView' : NoItemView,

		'onClose' : function () {
			this.collection.reset( [ ] );
		}

	} );

} );
