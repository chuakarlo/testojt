define( function ( require ) {
	'use strict';

	var Backbone             = require( 'backbone' );
	var Marionette           = require( 'marionette' );
	var Contentcompositeview = require( 'apps/homepage/external/content/views/ContentCompositeView' );
	var manifest             = require( 'apps/homepage/external/content/manifest' );

	function doInitialize ( view ) {
		var sharedData = view.model.get('baseObject').sharedData;
		view.collection = new Backbone.Collection( manifest( sharedData ) );
	}

	return Marionette.CollectionView.extend( {
		'initialize'    : function ( options ) {
			doInitialize( this );
		},
		'tagName'   : 'div',
		'id'        : 'content-display',
		'itemView'  : Contentcompositeview
	} );
} );