define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/observations/observation.html' );
	var moment     = require( 'moment' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),
		'tagName'  : 'li',

		'templateHelpers' : function () {
			return {
				formatDateAndTime : function () {
					return moment( this.OBSERVATIONDATE ).format( 'MMMM DD, YYYY hh:mm A' );
				}
			};
		}

	} );

} );
