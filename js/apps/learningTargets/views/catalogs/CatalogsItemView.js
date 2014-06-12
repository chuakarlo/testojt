define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/catalogs/catalog.html' );
	var _          = require( 'underscore' );

	var setLink =  {
		'Link1' : function ( resourceId ) {
			var opts = {
				'icon'            : 'fa-youtube-play',
				'catalogTraining' : 'catalog-video',
				'catalogLinks'    : '#resources/videos/' + resourceId
			};
			return opts;
		},

		'Link2' : function ( resourceId ) {
			var opts = {
				'icon'            : 'fa-university',
				'catalogTraining' : 'catalog-course',
				'catalogLinks'    : '#resources/learning/catalogs/' + resourceId + '/legacy'
			};

			return opts;
		},

		'Link3' : function ( ) {
			var opts = {
				'icon'            : 'fa-cubes',
				'catalogTraining' : 'catalog-training',
				'catalogLinks'    : '#catalog-training'
			};
			return opts;
		}
	};

	return Marionette.ItemView.extend( {
		'template'     : _.template( template ),

		'tagName'      : 'li',

		'ui'       : {
			'drawerToggleButton' : '.lt-toggle-btn'
		},

		'events' : {
			'click .catalog-training' : 'showTrainingCatalog'
		},

		'showTrainingCatalog' : function ( e ) {
			e.preventDefault();

			this.trigger( 'lt:training' );
		},

		'setCatalogLinks' : function ( model ) {
			_.extend( model, setLink[ 'Link' + model.get( 'CatalogResourceTypeId' ) ]( model.get( 'ResourceId' ) ) );
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
