define( function ( require ) {
	'use strict';

	var Marionette           = require( 'marionette' );
	var Contentcompositeview = require( 'apps/homepage/external/content3/views/ContentCompositeView' );
	var App                  = require( 'App' );

	return Marionette.CollectionView.extend( {

		'initialize' : function ( options ) {
			this.collection = App.Homepage.Sections.Content.contentCollection();
		},

		'id'        : 'content-display',
		'className' : 'col-md-12 no-padding',
		'itemView'  : Contentcompositeview

	} );
} );
