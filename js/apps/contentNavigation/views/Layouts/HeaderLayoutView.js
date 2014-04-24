define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../../templates/Layouts/HeaderLayoutTemplate.html' );
	var ItemView   = require( 'apps/contentNavigation/views/Licenses/LicenseItemView' );

	return Marionette.CompositeView.extend( {

		'itemView'          : ItemView,
		'itemViewContainer' : 'ul.cn-library-menu',
		'template'          : _.template( template )

	} );

} );