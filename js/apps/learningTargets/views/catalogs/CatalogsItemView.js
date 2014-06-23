define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var template        = require( 'text!apps/learningTargets/templates/catalogs/catalog.html' );
	var _               = require( 'underscore' );
	var setCatalogLinks = require( '../../helpers/setCatalogLinks' );

	return Marionette.ItemView.extend( {
		'template'     : _.template( template ),

		'tagName'      : 'li',

		'ui'       : {
			'drawerToggleButton' : '.lt-toggle-btn'
		},

		'events' : {
			'click .catalog-training-anchor' : 'showTrainingCatalog'
		},

		'showTrainingCatalog' : function ( e ) {
			e.preventDefault();
			e.stopPropagation();
			this.trigger( 'lt:training' );
			return false;
		},

		'setCatalogLinks' : function ( model ) {
			_.extend( model, setCatalogLinks( model ) );
		},

		'setCredits' : function ( model ) {
			model.credits = 'credit';
			if ( model.get( 'CreditHours' ) > 1 ) {
				model.credits = 'credits';
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
