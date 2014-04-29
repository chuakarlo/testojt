define( function ( require ) {

	'use strict';

	var Backbone            = require( 'backbone' );
	var LibraryTreeChildren = require( '../models/LibraryTreeChildrenModel' );

	return Backbone.Collection.extend( {
		'model' : LibraryTreeChildren
	} );

} );