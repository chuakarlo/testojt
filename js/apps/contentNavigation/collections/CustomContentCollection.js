define( function ( require ) {

	'use strict';

	var Backbone           = require( 'backbone' );
	var CustomContentModel = require( 'contentNavigation/models/CustomContentModel' );

	return Backbone.Collection.extend( {
		'model' : CustomContentModel
	} );

} );
