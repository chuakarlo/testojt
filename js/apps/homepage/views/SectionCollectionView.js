define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	return Marionette.CollectionView.extend( {
		'getItemView' : function ( item ) {
			if ( !item ) {
				return null;
			} else {
				var view = item.attributes.baseObject.getExternalView;
				return view;
			}
		}
	} );

} );