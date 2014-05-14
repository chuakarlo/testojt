define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	var UserWidgetItemView      = require( 'apps/homepage/external/widgets/views/UserWidgetCompositeView' );
	var EmptyUserWidgetItemView = require( 'apps/homepage/external/widgets/views/EmptyUserWidgetItemView' );

	var maxWidget = 3;

	return Marionette.CollectionView.extend( {
		'tagName'   : 'ul',
		'itemView'  : UserWidgetItemView,
		'className' : 'active-widgets-container no-padding',
		'onRender'  : function () {
			var self  = this;
			var count = maxWidget - this.collection.length;

			for ( var i = 0; i < count; i ++ ) {
				var emptyUserWidgetItemView = new EmptyUserWidgetItemView();
				self.$el.append( emptyUserWidgetItemView.render().el );
			}
		}
	} );
} );
