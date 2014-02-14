define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/observation.html' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'tagName' : 'ul',

		'className' : 'nav nav-pills nav-justified',

		'ui' : {
			'list' : 'li'
		},

		'events' : {
			'click @ui.list' : 'onClick'
		},

		'onClick' : function ( e ) {
			$( 'li.active' ).removeClass( 'active' );
			$( e.target ).parent().addClass( 'active' );
		}

	} );

} );
