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
				'Add videos to your queue';
			var details = !isQueue ?
				'Update your user setting to get recommended content.' :
				'by clicking the <span class="label label-sm label-default">Add to Queue</span> icon on any video thumbnail.';
			this.$el.find( '.empty-content h3' ).html( heading );
			this.$el.find( '.empty-content p' ).html( details );
		}
	} );
} );
