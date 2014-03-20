define( function ( require ) {
	'use strict';

	var _             = require( 'underscore' );
	var Marionette    = require( 'marionette' );
	var GroupItemView = require( '../views/GroupItemView' );
	var template      = require( 'text!../templates/groupsHeaderView.html' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'id'                : 'groups',
		'itemView'          : GroupItemView,
		'tagName'           : 'section',
		'itemViewContainer' : '.clmn-4'

	} );

} );
