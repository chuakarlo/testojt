// ## Manages f/e logic for the application
define( function( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	var Controllers			= {
		'PD360ContentController'	: require( './PD360ContentController' ),
		'FiltersController'			: require( './PD360FilterController' )
	};


	var Utils = require( '../UtilitiesController' );


	var PD360LibraryController = Marionette.Controller.extend( {

		'contentLibraryType' : 'PD360Content',

	    'initialize' : function( options ) {
			var configVerified	= this._verifyConfig( options );

			if ( configVerified ) {

				this._setVent( options.vent );

				this._setContentController();

				this._setFiltersController();
			}

		},

	    '_setVent' : function ( vent ) {
			this.vent = vent;
	    },

	    '_setContentController' : function () {
			this.contentController	= new Controllers.PD360ContentController( {
				'contentLibraryType' : this.contentLibraryType,
				'vent'               : this.vent
			} );
	    },

	    '_setFiltersController' : function () {
			this.filtersController	= new Controllers.FiltersController( {
				'contentLibraryType' : this.contentLibraryType,
				'vent'               : this.vent
			} );
	    },

	    '_verifyConfig' : function ( options ) {
			var _optVent     = options.vent;
			var _optVerified = true;

			if ( !_optVent ) {
				Utils.Controller.throwError( 'Missing event manager.', 'PD360 Library Panel' );

				_optVerified = false;
			}

			return _optVerified;

		}


	} );

    return PD360LibraryController;

} );