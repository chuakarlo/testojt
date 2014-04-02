define( function ( require ) {
	'use strict';

	var Backbone    = require( 'backbone' );
	var WidgetModel = require( 'apps/homepage/external/what-to-do-next/models/WidgetModel' );

	return Backbone.Collection.extend( {
		'model'      : WidgetModel,
		'comparator' : 'date'
	} );

} );