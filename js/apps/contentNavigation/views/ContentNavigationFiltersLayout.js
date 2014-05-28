define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );

	var template = require( 'text!../templates/contentNavigationFiltersLayout.html' );

	return Marionette.Layout.extend( {

		'className' : 'cn-pd360-filters',
		'template'  : _.template( template ),

		'regions' : {
			'gradesRegion'   : '#cn-grades',
			'subjectsRegion' : '#cn-subjects',
			'topicsRegion'   : '#cn-topics'
		},

		'events' : {
			'click .fa' : 'toggleFilter'
		},

		'toggleFilter' : function ( event ) {
			if ( $( event.target ).hasClass( 'open' ) ) {
				$( event.target ).removeClass( 'open' ).removeClass( 'fa-minus' ).addClass( 'fa-plus' );
				$( '#cn-' + $( event.target ).attr( 'id' ) ).hide();
			} else {
				$( event.target ).addClass( 'open' ).removeClass( 'fa-plus' ).addClass( 'fa-minus' );
				$( '#cn-' + $( event.target ).attr( 'id' ) ).show();
			}
		}

	} );

} );
