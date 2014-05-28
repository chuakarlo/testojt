define( function ( require ) {

	'use strict';

	var Backbone    = require( 'backbone' );
	var FilterModel = require( 'contentNavigation/models/FilterModel' );

	return Backbone.Collection.extend( {
		'model' : FilterModel
	} );

} );
