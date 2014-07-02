define( function ( require ) {
	'use strict';

	var Backbone    = require( 'backbone' );
	var WidgetModel = require( 'apps/homepage/external/active-widgets/models/WidgetModel' );

	return Backbone.Collection.extend( {
		'model' : WidgetModel
	} );

} );
