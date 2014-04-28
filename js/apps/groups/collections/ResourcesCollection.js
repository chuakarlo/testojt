define( function ( require ) {
	'use strict';

	var Backbone     = require( 'backbone' );
	var ResourceModel = require( '../models/ResourceModel' );

	return Backbone.Collection.extend( {

		'model' : ResourceModel

	} );

} );