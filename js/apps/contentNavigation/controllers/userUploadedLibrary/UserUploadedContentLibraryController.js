// ## Manages f/e logic for the application
define( function( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	var Controllers = {
		'UserUploadedContentController' : require( './UserUploadedContentController' ),
		'FiltersController'             : require( './UserUploadedContentFilterController' )
	};


	var UtilitiesController = require( '../UtilitiesController' );


	var UserUploadedContentLibraryController = Marionette.Controller.extend( {

		'contentLibraryType' : 'UserUploadedContent',

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
			this.contentController	= new Controllers.UserUploadedContentController( {
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
				UtilitiesController.throwError( 'Missing event manager.', ' User Uploaded Content Library Panel' );

				_optVerified = false;
			}

			return _optVerified;
		}

	} );

    return UserUploadedContentLibraryController;

} );