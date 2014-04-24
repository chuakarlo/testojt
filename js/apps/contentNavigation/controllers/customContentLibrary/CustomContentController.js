// ## Manages f/e logic for the application
define( function( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var  _         = require( 'underscore' );

	var ControllerBase = {
		'Content'	: require( '../base/ContentBase' )
	};

	var CustomContentController = Marionette.Controller.extend( {

	    'initialize' : function( options ) {
			_.extend( this , ControllerBase.Content );

			this._createVents( options );

			this._setSortParam();

			this.initializeCollection( options, 'CustomContent' );

			this.initializeComponent();

			this.contentLibraryType = options.contentLibraryType;

			this.App = options.App;

			this.initializeFetching( 5330 );

	    },

		'_getSegmentParams' : function ( ContentId ) {
			return  {
				'path'   : 'com.schoolimprovement.pd360.dao.ContentService',
				'method' : 'getContentByParentId',
				'args'   : {
			      'id' : ContentId
				}
	        };
		}

	} );

    return CustomContentController;

 } );
