// ## Manages f/e logic for the application
define( function( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	var Controllers = {
		'PD360ContentController'	: require( './CustomContentController' ),
		'FiltersController'			: require( './CustomContentFilterController' )
	};


	var UtilitiesController = require( '../UtilitiesController' );


	var CustomContentLibraryController = Marionette.Controller.extend( {

		'contentLibraryType' : 'CustomContent',

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
				UtilitiesController.throwError( 'Missing event manager.', ' Custom Content Library Panel' );

				_optVerified = false;
			}

			return _optVerified;
		}

	} );

    return CustomContentLibraryController;

} );