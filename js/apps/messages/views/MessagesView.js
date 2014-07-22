define( function ( require ) {
	'use strict';

	var Marionette       = require( 'marionette' );
	var InnerMessageView = require( 'apps/messages/views/InnerMessageView' );
	var template         = require( 'text!apps/messages/templates/messages.html' );
	var _                = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : InnerMessageView,
		'itemViewContainer' : '.accordion',
		'ui'                : {
			'date'   : '.filter .date',
			'sender' : '.filter .sender',
			'all'    : '.dropdown-menu .all',
			'read'   : '.dropdown-menu .read',
			'unread' : '.dropdown-menu .unread',
			'none'   : '.dropdown-menu .none'
		}
	} );

} );
