define( function ( require ) {
	'use strict';

	// libraries
	var Marionette = require( 'marionette' );

	// views
	var ItemView = require( 'videoPlayer/views/share/SelectedItemView' );

	return Marionette.CollectionView.extend( {

		'itemView' : ItemView,
		'tagName'  : 'ul',

		'initialize' : function () {
			this.listenTo( this, 'itemview:item:remove', this.itemViewRemove );
		},

		'itemViewRemove' : function ( selectedItemView ) {
			this.collection.remove( selectedItemView.model );
		}

	} );

} );
