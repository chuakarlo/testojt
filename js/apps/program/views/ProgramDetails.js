define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!../templates/ProgramDetails.html' );

	return Marionette.ItemView.extend( {

		'tagName' : 'span',

		'template' : _.template( template ),

		'initialize' : function ( options ) {
			_.bindAll( this );
			this.options = options;
		},

		'templateHelpers' : function () {
			var options = this.options;

			return {
				'programName' : function () {
					return options.details.ProgramName;
				},

				'programDescription' : function () {
					return options.details.ProgramDescription;
				}
			};
		}

	} );

} );
