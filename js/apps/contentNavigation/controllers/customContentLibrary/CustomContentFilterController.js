define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Remoting   = require( 'Remoting' );
	var $          = require( 'jquery' );

	var ControllerBase = {
		'Filter' : require( '../base/FilterBase' )
	};

	var components  = {
		'ContentTreeComponent' : require( '../../components/ContentTreeComponent' )
	};

	var collections = {
		'LibraryTreeCollection' : require('../../collections/LibraryTreeCollection')
	};

	return Marionette.Controller.extend( {

		'initialize' : function ( options ) {
			_.extend( this , ControllerBase.Filter );

			this.initializeComponent();

			this._createVents( options );

			this.contentLibraryType = options.contentLibraryType;

		},

		getCustomContentCategories : function () {
			var fetchCategory =  {
				'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
				'method' : 'RespondCustomContentGetTree',
				'args'   : {
				    'licenseTypeId'        : 1,
				    'licenseContentTypeId' : 174
				}
			};

	        this.fetchingCategories = Remoting.fetch( [ fetchCategory ] );

			$.when( this.fetchingCategories ).done( function ( models ) {
				this.createFilterComponents( models );
			}.bind( this ) ).fail( function ( error ) {
			}.bind( this ) );
		},

		createFilterComponents : function ( data ) {
			var customContentTreeCategories = _.flatten( data );
			var customContentLibraryTreeCollection = new collections.LibraryTreeCollection();

			customContentLibraryTreeCollection.add( customContentTreeCategories );

			var customContentFilterComponent = new components.ContentTreeComponent( {
				'vent'              : this.vent,
				'title'             : 'Categories',
				'id'                : 'cn-custom-content-filter',
				'itemViewContainer' : '.cn-content-filter',
				'collection'        : customContentLibraryTreeCollection
			} );

			this.addFilterComponent( 'customContentFilter', customContentFilterComponent );
		}

	} );

} );