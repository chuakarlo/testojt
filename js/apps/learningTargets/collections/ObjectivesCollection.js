define( function ( require ) {
	'use strict';

	var Backbone        = require( 'backbone' );
	var ObjectivesModel = require( '../models/ObjectivesModel' );

	return Backbone.Collection.extend( {
		'model' : ObjectivesModel
	} );

} );
