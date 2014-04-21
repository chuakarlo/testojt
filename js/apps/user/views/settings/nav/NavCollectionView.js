define( function ( require ) {
	'use strict';

	var Marionette  = require( 'marionette' );
	var NavItemView = require( './NavItemView' );

	return Marionette.CollectionView.extend( {

		'tagName' : 'ul',

		'className' : 'nav nav-tabs nav-tabs-right',

		'itemView' : NavItemView

	} );

} );