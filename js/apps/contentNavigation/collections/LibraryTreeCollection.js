define( function ( require ) {
	
	'use strict';

	var Backbone         = require( 'backbone' );
	var LibraryTreeModel = require( '../models/LibraryTreeModel' );

	return Backbone.Collection.extend( {
		'url'   : '/',
		'model' : LibraryTreeModel
	} );

} );