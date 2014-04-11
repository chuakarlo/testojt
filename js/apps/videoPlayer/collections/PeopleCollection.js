define( function ( require ) {
	'use strict';

	var Backbone    = require( 'backbone' );
	var PersonModel = require( 'videoPlayer/models/PersonModel' );

	return Backbone.Collection.extend( {

		'model' : PersonModel

	} );

} );
