define ( function ( require ) {
	'use strict';

	var Backbone     = require( 'backbone' );
	var WidgetModel  = require( 'apps/homepage/external/what-to-do-next/external/process/models/WidgetModel' );

return Backbone.Collection.extend( {
		'model'      : WidgetModel,
		'url'        : 'http://zubu.cloudapp.net:8889/process',
		'comparator' : function ( model ) {
			var date = new Date( model.get( 'date' ) ).getTime();
			return date;
		}
	} );

} );