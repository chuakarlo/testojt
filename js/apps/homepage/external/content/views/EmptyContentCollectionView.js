define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/content/templates/emptyContentCollectionView.html' );

	return Marionette.ItemView.extend( {
		'tagName'   : 'div',
		'className' : 'empty-view',
		'template'  : _.template( template ),
		'onRender'  : function () {
			var isQueue = this.options._id === 'your-queue';
			var heading = !isQueue ?
				'No recommended videos.' :
				'You currently do not have any videos in your queue.';
			var details = !isQueue ?
				'Update your user setting to get recommended content.' :
				'Items can be added to your queue by clicking <span class="label label-sm label-default">Add to Queue</span> <span class="sc-watch-later-icon grayed fa fa-clock-o"></span> when browsing content';
			this.$el.find( '.empty-content h3' ).html( heading );
			this.$el.find( '.empty-content p' ).html( details );
		}
	} );
} );
