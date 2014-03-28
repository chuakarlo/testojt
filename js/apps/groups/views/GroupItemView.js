define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );
	var template   = require( 'text!../templates/groupsView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),
		'tagName'  : 'li',

	    'templateHelpers' : {

			getAbbreviation: function ( text, num ) {
				var abbreviation = $.trim( text ).substring( 0, num ) + '...';
				return abbreviation;
			}

		}

	} );

} );

