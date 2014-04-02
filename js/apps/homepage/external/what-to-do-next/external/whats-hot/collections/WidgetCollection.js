define ( function ( require ) {
	'use strict';

	var Backbone     = require( 'backbone' );
	var WidgetModel  = require( 'apps/homepage/external/what-to-do-next/external/whats-hot/models/WidgetModel' );

return Backbone.Collection.extend( {
		'model'      : WidgetModel,
		'url'        : 'http://zubu.cloudapp.net:8889/whatshot',
		'comparator' : function ( model ) {
			var view = model.get( 'view' );
			return -view;
		}
	} );

} );