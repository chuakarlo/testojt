define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/catalogs/catalog.html' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),

		'tagName'  : 'li',

		'ui'       : {
			'drawerToggleButton' : '.lt-toggle-btn'
		},

		'events' : {
			'click .catalog-training' : 'showTraining'
		},

		'showTrainingCatalog' : function ( e ) {
			e.preventDefault();

			this.trigger( 'lt:training' );
		},

		'setCatalogLinks' : function ( model ) {
			model.catalogTraining = '';
			if ( model.get( 'CatalogResourceTypeId' ) === 1 ) {
				model.catalogLinks = '#resources/videos/' + model.get( 'ResourceId' );
			} else if ( model.get( 'CatalogResourceTypeId' ) === 2 ) {
				model.catalogLinks = 'https://www.pd360.com/pd360.cfm#tab=courses&page=coursesBrowse';
			} else {
				model.catalogLinks    = '#';
				model.catalogTraining = 'catalog-training';
			}

		},

		'templateHelpers' : function ( ) {
			var self = this;

			self.setCatalogLinks ( self.model );

			return self.model;
		}
	} );
} );
