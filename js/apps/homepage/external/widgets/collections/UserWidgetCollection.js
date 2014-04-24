define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	var UserWidgetModel = require( 'apps/homepage/external/widgets/models/UserWidgetModel' );

	return Backbone.Collection.extend( {
		'model' : UserWidgetModel
	} );

} );