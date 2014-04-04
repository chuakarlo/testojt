define( function ( require ) {
	'use strict';

	// libraries
	var Marionette = require( 'marionette' );

	// views
	var ItemView   = require( 'videoPlayer/views/share/SelectedItemView' );

	return Marionette.CollectionView.extend( {

		'initialize' : function ( options ) {
			this.listenTo( this, 'itemview:item:remove', this.itemViewRemove );
		},

		'tagName' : 'ul',

		'itemView' : ItemView,

		'itemViewRemove' : function ( selectedEmailItemView ) {
			this.collection.remove( selectedEmailItemView.model );
		}

	} );

} );
