define ( function (require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	//doesn't return the actual backbone collection
	return Backbone.Collection.extend( {
		url : 'http://zubu.cloudapp.net:8889/widgets/3'
	} );

} );