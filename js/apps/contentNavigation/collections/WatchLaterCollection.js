define( function ( require ) {
	
	'use strict';

	var Backbone        = require( 'backbone' );
	var WatchLaterModel = require( '../models/WatchLaterModel' );

	return Backbone.Collection.extend( {
		'model' : WatchLaterModel
	} );

} );