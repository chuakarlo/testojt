// ## Manages f/e logic for the application
define( function( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var  _         = require( 'underscore' );
	require( 'jquery' );

	var ControllerBase = {
		'Content' : require( '../base/ContentBase' )
	};

	var Session = require( 'Session' );


	var PD360ContentController = Marionette.Controller.extend( {

	    'initialize' : function( options ) {

			_.extend( this , ControllerBase.Content );

			this._createVents( options );

			this._setSortParam();

			this.initializeCollection( options, 'PD360' );

			this.initializeComponent();

			this.contentLibraryType = options.contentLibraryType;

			this.App = options.App;

			this.initializeFetching( '' );

	    },

		'_getSegmentParams' : function (  ) {
			return  {
				'path'   : 'com.schoolimprovement.pd360.dao.SearchService',
				'method' : 'RespondSearchAPI',
				'args'   : {
			      'persId'     : Session.personnelId(),
			      'start'      : this._getStartingRow(),
			      'rows'       : this.queryLimit,
			      'searchType' : 'VideosCore',
			      'searchData' : this._getFiltersParam(),
			      'sort'       : this.sortByParam
				}
	        };
		}

	} );

    return PD360ContentController;

 } );
