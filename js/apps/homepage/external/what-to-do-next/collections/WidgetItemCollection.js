define( function ( require ) {
	'use strict';

	var Backbone        = require( 'backbone' );
	var WidgetItemModel = require( 'apps/homepage/external/what-to-do-next/models/WidgetItemModel' );

	return Backbone.Collection.extend( {
		'model'      : WidgetItemModel,
		'comparator' : 'date'
	} );

} );