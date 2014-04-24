define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template  = require( 'text!../../templates/Filters/FilterContainerViewTemplate.html' );

	return Marionette.ItemView.extend( {

		'className' : 'cn-filters-container',
		'tagName'   : 'div',
		'template'  : _.template( template )

	} );

} );
