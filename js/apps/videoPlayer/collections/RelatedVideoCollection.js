define ( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	var RelatedVideoModel = require( 'videoPlayer/models/RelatedVideoModel' );

	return Backbone.Collection.extend( {

		'model'  : RelatedVideoModel,

		'initialize' : function( ) { }

	} );

} );
