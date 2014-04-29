define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/Layouts/MainLayoutTemplate.html' );

	return Marionette.Layout.extend( {

		'template'  : _.template( template ),
		'className' : 'cn-content',

		'regions' : {
			'topRegion'    : '#cn-top-region',
			'leftRegion'   : '#cn-left-region',
			'centerRegion' : '#cn-middle-region'
		}

	} );

} );