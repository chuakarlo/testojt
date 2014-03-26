define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../../templates/Layouts/HeaderLayoutTemplate.html' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),
		'ui' : {
			'selectSort' : 'span.cn-sortby-category'
		}
	} );

} );