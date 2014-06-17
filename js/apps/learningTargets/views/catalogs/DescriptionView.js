define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/catalogs/description.html' );
	var _          = require( 'underscore' );
	var moment     = require( 'moment' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),

		'templateHelpers' : function () {
			return {
				getStartTime : function () {
					return moment( this.StartTime ).format( 'dddd MMMM DD, YYYY' );
				},
				getEndTime   : function () {
					return moment( this.EndTime ).format( 'dddd MMMM DD, YYYY' );
				},
				getTimeDiff  : function () {
					var start = moment( this.StartTime ).format( 'hh:mm A' );
					var end = moment( this.EndTime ).format( 'hh:mm A' );
					return start + ' - ' + end;
				}
			};
		}

	} );

} );
