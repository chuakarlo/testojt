define( function ( require ) {
	'use strict';

	var Marionette     = require( 'marionette' );
	var template       = require( 'text!apps/learningTargets/templates/groups/groups.html' );
	var GroupsItemView = require( 'apps/learningTargets/views/groups/GroupsItemView' );
	var _              = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : GroupsItemView,
		'itemViewContainer' : 'ul.lt-list'
	} );

} );
