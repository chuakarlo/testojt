define( function () {
	'use strict';

	var App = require( 'App' );
	var $   = require('jquery');

	return function ( e, widgetDirectory ) {
		widgetDirectory = widgetDirectory || '';
		App.navigate( widgetDirectory + $( e.currentTarget ).attr( 'data-url' ), {
			'trigger' : true
		} );
	};
} );
