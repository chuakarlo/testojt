//code review
define( function ( require ) {
	'use strict';

	var Marionette         = require( 'marionette' );
	var UserWidgetItemView = require( 'apps/homepage/external/widgets/views/UserWidgetCompositeView' );

	return Marionette.CollectionView.extend( {
		'tagName'   : 'ul',
		'itemView'  : UserWidgetItemView,
		'className' : 'row',
		'onRender' : function () {
			this.$el.css('width', '1200px');
		}
	} );

} );