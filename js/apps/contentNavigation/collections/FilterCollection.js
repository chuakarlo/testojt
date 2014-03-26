define( function ( require ) {
	'use strict';

	var Backbone    = require( 'backbone' );
	var FilterModel = require( '../models/FilterModel' );

	return Backbone.Collection.extend( {
		'url'   : '/',
		'model' : FilterModel
	} );

} );