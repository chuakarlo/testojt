define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
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
		},
		'events' : {
			'click .cn-responsive-button-panel .btn' : function ( ev ) {

				$( '.cn-sidebar-content' ).addClass( 'responsive-hidden' );
				$( 'body' ).removeClass( 'responsive-non-scrollable' );

			}
		}

	} );

} );
