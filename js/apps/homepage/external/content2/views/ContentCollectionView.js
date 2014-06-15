define( function ( require ) {
	'use strict';

	var App                  = require( 'App' );
	var Marionette           = require( 'marionette' );

	return Marionette.CollectionView.extend( {
		'initialize' : function () {
			this.collection = App.Homepage.Sections.Content.contentCollection();
		},
		'tagName'    : 'div',
		'id'         : 'content-display',
		'className'  : 'col-md-12 no-padding',
		'itemView'   : require( 'apps/homepage/external/content2/views/ContentCompositeView' )
	} );
} );
