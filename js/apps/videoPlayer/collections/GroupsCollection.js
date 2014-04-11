define( function ( require ) {
	'use strict';

	var Backbone   = require( 'backbone' );
	var GroupModel = require( 'videoPlayer/models/GroupModel' );

	return Backbone.Collection.extend( {

		'model' : GroupModel

	} );

} );
