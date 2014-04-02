define( function ( require ) {
	'use strict';

	var Backbone    = require( 'backbone' );
	var MemberModel = require( 'groups/models/MemberModel' );

	return Backbone.Collection.extend( {

		'model'   : MemberModel

	} );

} );