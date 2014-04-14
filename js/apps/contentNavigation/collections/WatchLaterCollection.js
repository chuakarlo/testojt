define( function ( require ) {
	'use strict';

	var Backbone        = require( 'backbone' );
	var WatchLaterModel = require( 'contentNavigation/models/WatchLaterModel' );

	return Backbone.Collection.extend( {
		'model' : WatchLaterModel
	} );

} );