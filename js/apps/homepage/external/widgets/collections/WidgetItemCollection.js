define( function ( require ) {
	'use strict';

	var Backbone        = require( 'backbone' );
	var WidgetItemModel = require( 'apps/homepage/external/widgets/models/WidgetItemModel' );

	return Backbone.Collection.extend( {
		'model'      : WidgetItemModel,
		'comparator' : function () {
			return 'date';
		}
	} );

} );