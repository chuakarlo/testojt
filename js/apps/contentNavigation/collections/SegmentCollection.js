define( function ( require ) {
	
	'use strict';

	var Backbone     = require( 'backbone' );
	var SegmentModel = require( '../models/SegmentModel' );

	return Backbone.Collection.extend( {
		'url'   : '/api/contents',
		'model' : SegmentModel
	} );

} );