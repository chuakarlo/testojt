define( function( require ) {
	'use strict';

	var Marionette        = require( 'marionette' );
	var SearchNavItemView = require( './SearchNavItemView' );

	return Marionette.CollectionView.extend( {

		'tagName'   : 'ul',
		'className' : 'nav nav-tabs nav-tabs-right',

		'itemView'  : SearchNavItemView,

	} );
} );