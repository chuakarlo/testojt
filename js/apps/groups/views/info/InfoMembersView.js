define( function ( require ) {
	'use strict';

	var Marionette     = require( 'marionette' );
	var MemberItemView = require( 'groups/views/info/InfoMemberItemView' );

	return Marionette.CompositeView.extend( {

		'class'             : 'images',
		'itemView'          : MemberItemView,
		'tagName'           : 'div',
		'itemViewContainer' : '.memberImages'

	} );

} );
