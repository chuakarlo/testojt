define( function ( require ) {

	'use strict';

	var Backbone  = require( 'backbone' );
	var SortModel = require( 'contentNavigation/models/SortModel' );

	return Backbone.Collection.extend( {
		'model' : SortModel
	} );

} );
