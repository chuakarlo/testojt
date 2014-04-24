define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var config     = require( '../../config/config' );

	var ControllerBase = {
		'Filter' : require( '../base/FilterBase' )
	};

	var components  = {
		'FilterComponent' : require( '../../components/FilterComponent' )
	};

	var collections = {
		'FilterCollection' : require('../../collections/FilterCollection')
	};

	return Marionette.Controller.extend( {

		'initialize' : function ( options ) {
			_.extend( this , ControllerBase.Filter );

			this.initializeComponent();

			this._createVents( options );

			this.contentLibraryType = options.contentLibraryType;
		},

		getCustomContentCategories : function () {
			this.createFilterComponents();
		},

		createFilterComponents : function ( data ) {

			var userUploadedContentFilterCollection = new collections.FilterCollection();

			userUploadedContentFilterCollection.add( config.Filters.UUCC );

			var userUploadedContentFilterComponent = new components.FilterComponent( {
				'vent'              : this.vent,
				'title'             : 'Categories',
				'id'                : 'cn-custom-content-filter',
				'splitColumn'       : false,
				'multiSelect'		: false,
				'itemViewContainer' : '.cn-content-filter',
				'collection'        : userUploadedContentFilterCollection
			} );

			this.addFilterComponent( 'customContentFilter', userUploadedContentFilterComponent );
		}


	} );

} );