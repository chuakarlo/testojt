// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	var ContentLibraries = {
		'PD360'               : require( './pd360Library/PD360LibraryController' ),
		'CustomContent'       : require( './customContentLibrary/CustomContentLibraryController' ),
		'UserUploadedContent' : require( './userUploadedLibrary/UserUploadedContentLibraryController' )
	};

	var LibraryController = Marionette.Controller.extend( {

		'initialize' : function ( options ) {
			this.App = options.App;
			this._createVents();
			this._changeLibrary( 'PD360Content', 'PD360' );
		},

		'_createVents' : function () {
			this.vent = this.options.vent;
			this.vent.mediator.on( 'library:change', this._changeLibrary, this );
		},

		'_changeLibrary' : function ( contentLibraryType, libraryLabel ) {
			var _lib = null;

			// Check if Library instance has been created already
			if ( !this.currentLibrary ) {
				_lib = this._createLibraryPanel( contentLibraryType, libraryLabel );
				this.currentLibrary = _lib;
				this._showLibrary();
			}

			// Check if passed params are the same as the currentLibrary's
			if ( this.currentLibrary.options.contentLibraryType !== contentLibraryType && this.currentLibrary.options.libraryLabel !== libraryLabel ) {
				_lib = this._createLibraryPanel( contentLibraryType, libraryLabel );
			}

			// Check if passed lib is the current Library
			if ( this.currentLibrary !== _lib && _lib !== null ) {

				delete this.currentLibrary;

				this.currentLibrary = _lib;

				this._showLibrary();

			}

			/*setTimeout( function () {
				$( '.cn-library-menu .cn-license-item' ).removeClass( 'fa fa-check' );
				$( '.cn-library-menu .cn-license-item:contains("' + libraryLabel + '")' ).addClass( 'fa fa-check' );
			}, 0);*/

		},

		'_showLibrary' : function ( ) {
			this._showSegments( this.currentLibrary.contentController.getView() );
			this._showFilters( this.currentLibrary.filtersController.getView() );
		},

		'_showSegments' : function ( view ) {
			this.App.centerRegion.show( view );
		},

		'_showFilters' : function ( view ) {
			this.App.leftRegion.show( view );
		},

		'_createLibraryPanel' : function ( contentLibraryType, libraryLabel ) {
			var _lib = null;

			if ( contentLibraryType === 'PD360Content' ) {
				var pd360Content = new ContentLibraries.PD360( {
					'vent'               : this.vent,
					'contentLibraryType' : contentLibraryType,
					'libraryLabel'       : libraryLabel
				} );

				_lib = pd360Content;
			} else if ( contentLibraryType === 'CustomContent' ) {
				var customContent = new ContentLibraries.CustomContent( {
					'vent'               : this.vent,
					'contentLibraryType' : contentLibraryType,
					'libraryLabel'       : libraryLabel
				} );

				_lib = customContent;
			} else if ( contentLibraryType === 'UserUploadedContent' ) {
				var userUploadedContent = new ContentLibraries.UserUploadedContent( {
					'vent'               : this.vent,
					'contentLibraryType' : contentLibraryType,
					'libraryLabel'       : libraryLabel
				} );

				_lib = userUploadedContent;
			}

			return _lib;
		}

	} );

	return LibraryController;

} );
