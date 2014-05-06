define( function ( require ) {
	'use strict';

	var Marionette        = require( 'marionette' );
	var _                 = require( 'underscore' );
	var ResourceItemView  = require( '../views/GroupResourceItemView' );
	var ResourceEmptyView = require( '../views/GroupResourceMembersEmptyView' );
	var template          = require( 'text!../templates/groupResourcesMembersView.html' );

	return Marionette.CompositeView.extend( {

		'itemView'  : ResourceItemView,
		'tagName'   : 'ul',
		'className' : 'resource-leader media-list',
		'template'  : _.template( template ),
		'emptyView' : ResourceEmptyView

	} );

} );