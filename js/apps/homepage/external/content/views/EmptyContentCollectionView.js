define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/content/templates/emptyContentCollectionView.html' );

	return Marionette.ItemView.extend( {
		'tagName'   : 'div',
		'className' : 'empty-view',
		'template'  : _.template( template )
	} );
} );
