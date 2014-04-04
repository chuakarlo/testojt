define( function ( require ) {
	'use strict';

	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var $              = require( 'jquery' );
	var template       = require( 'text!../templates/groupHeaderView.html' );

	return Marionette.ItemView.extend( {

		'template'          : _.template( template ),
		'class'             : 'header',
		'tagName'           : 'div',

		'templateHelpers' : function () {

			return {

				'memberCount' : function () {
					return this.collection.count;
				}.bind( this ),

				getAbbreviation: function ( text, num ) {
					var abbreviation = $.trim( text ).substring( 0, num ) + '...';
					return abbreviation;
				}

			};

		}

	} );

} );
