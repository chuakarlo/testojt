define( function ( require ) {
	'use strict';

	// libraries
	var Marionette = require( 'marionette' );

	// views
	var ItemView = require( 'videoPlayer/views/share/SelectedItemView' );

	return Marionette.CollectionView.extend( {

		'initialize' : function () {
			this.listenTo( this, 'itemview:item:remove', this.itemViewRemove );
		},

		'itemView' : ItemView,

		'itemViewRemove' : function ( selectedItemView ) {
			this.collection.remove( selectedItemView.model );
		}

	} );

} );
