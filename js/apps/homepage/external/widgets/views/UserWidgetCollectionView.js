define( function ( require ) {
	'use strict';

	var Marionette         = require( 'marionette' );
	var UserWidgetItemView = require( 'apps/homepage/external/widgets/views/UserWidgetCompositeView' );

	return Marionette.CollectionView.extend( {
		'tagName'   : 'ul',
		'itemView'  : UserWidgetItemView,
		'className' : 'active-widgets-container no-padding'
	} );
} );
