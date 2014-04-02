define ( function ( require ) {
	'use strict';

	var Backbone     = require( 'backbone' );
	var WidgetModel  = require( 'apps/homepage/external/what-to-do-next/external/your-profile/models/WidgetModel' );

return Backbone.Collection.extend( {
		'model' : WidgetModel,
		'url'   : 'http://zubu.cloudapp.net:8889/yourProfile'
	} );
} );