define( function ( require ) {
	'use strict';

	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var MemberItemView = require( '../views/MemberItemView' );
	var template       = require( 'text!../templates/groupMembersView.html' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'itemView'          : MemberItemView,
		'itemViewContainer' : '.memberAvatars'

	} );

} );
