define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/contentNavigationFiltersLayout.html' );

	return Marionette.Layout.extend( {

		'className' : 'cn-pd360-filters',

		'template' : _.template( template ),

		'regions' : {
			'gradesRegion'   : '#cn-grades',
			'subjectsRegion' : '#cn-subjects',
			'topicsRegion'   : '#cn-topics'
		}

	} );

} );
