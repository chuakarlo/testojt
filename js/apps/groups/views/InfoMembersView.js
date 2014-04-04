define( function ( require ) {
	'use strict';

	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var MemberItemView = require( 'groups/views/InfoMemberItemView' );
	var template       = require( 'text!../templates/membersView.html' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'class'             : 'images',
		'itemView'          : MemberItemView,
		'tagName'           : 'div',
		'itemViewContainer' : '.memberImages'

	} );

} );
