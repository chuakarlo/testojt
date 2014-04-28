define( function ( require ) {
	'use strict';

	var Marionette       = require( 'marionette' );
	var _                = require( 'underscore' );
	var ResourceItemView = require( '../views/GroupResourceItemView' );
	var template         = require( 'text!../templates/groupResourcesView.html' );

	return Marionette.CompositeView.extend( {

		'itemView'  : ResourceItemView,
		'tagName'   : 'ul',
		'className' : 'media-list',
		'template'  : _.template( template )

	} );

} );