define( function ( require ) {
	'use strict';

	var Marionette     = require( 'marionette' );
	var template       = require( 'text!apps/learningTargets/templates/groups/groups.html' );
	var GroupsItemView = require( 'apps/learningTargets/views/groups/GroupsItemView' );
	var EmptyView      = require( 'apps/learningTargets/views/EmptyView' );
	var _              = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : GroupsItemView,
		'emptyView'         : EmptyView,
		'itemViewContainer' : 'ul.lt-list'
	} );

} );
