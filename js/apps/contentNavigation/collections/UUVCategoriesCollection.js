define( function ( require ) {

	'use strict';

	var Backbone      = require( 'backbone' );
	var CategoryModel = require( 'contentNavigation/models/UUVCategoryModel' );

	return Backbone.Collection.extend( {
		'model' : CategoryModel
	} );

} );
