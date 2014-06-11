define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/catalogs/catalog.html' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {
		'template'     : _.template( template ),

		'tagName'      : 'li',

		'ui'       : {
			'drawerToggleButton' : '.lt-toggle-btn'
		},

		'events' : {
			'click .catalog-training' : 'showTrainingCatalog',
			'click .catalog-course'   : 'showCourseCatalog'
		},

		'showTrainingCatalog' : function ( e ) {
			e.preventDefault();

			this.trigger( 'lt:training' );
		},

		'showCourseCatalog' : function ( e ) {
			e.preventDefault();

			var self = this;

			self.trigger( 'lt:redirect', 'courses', 'coursesBrowse', self.model.get( 'ResourceId' ) );
		},

		'setCatalogLinks' : function ( model ) {
			model.catalogTraining = '';
			if ( model.get( 'CatalogResourceTypeId' ) === 1 ) {
				model.catalogTraining = 'catalog-video';
				model.catalogLinks = '#resources/videos/' + model.get( 'ResourceId' );
			} else if ( model.get( 'CatalogResourceTypeId' ) === 2 ) {
				model.catalogLinks    = '#';
				model.catalogTraining = 'catalog-course';
			} else {
				model.catalogLinks    = '#';
				model.catalogTraining = 'catalog-training';
			}
		},

		'setCredits' : function ( model ) {
			model.credits = '';
			if ( model.get( 'CreditHours' ) > 1 ) {
				model.credits = 'credits';
			} else {
				model.credits = 'credit';
			}
		},

		'templateHelpers' : function ( ) {
			var self = this;

			self.setCatalogLinks ( self.model );
			self.setCredits ( self.model );
			return self.model;
		}
	} );
} );
