define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/catalogs/description.html' );
	var _          = require( 'underscore' );
	var getTime    = require( '../../../../common/helpers/getTime' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),

		'templateHelpers' : function () {
			return {
				getStartTime : function () {
					return getTime( this.StartTime );
				},

				getEndTime : function () {
					return getTime( this.EndTime );
				}
			};
		}

	} );

} );
