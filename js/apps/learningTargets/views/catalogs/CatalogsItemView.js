define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var template        = require( 'text!apps/learningTargets/templates/catalogs/catalog.html' );
	var _               = require( 'underscore' );
	var setCatalogLinks = require( '../../helpers/setCatalogLinks' );
	var $               = require( 'jquery' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),
		'tagName'  : 'li',

		'ui' : {
			'drawerToggleButton' : '.lt-toggle-btn',
			'spanhere'           : '.catalog-wrapper'
		},

		'events' : {
			'click .catalog-training-anchor' : 'showTrainingCatalog'
		},

		'showTrainingCatalog' : function ( e ) {
			this.trigger( 'lt:training' );
			this.$( '.catalog-training-anchor' ).blur();
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
		},

		'onRender' : function () {
			if ( this.model.catalogTraining === 'catalog-training' ) {
				this.ui.spanhere.append( '<button class="' + this.model.catalogTraining + '-anchor btn-link">' + this.model.get( 'ResourceName' ) + '</button>' );
			}else {
				this.ui.spanhere.append( '<a href="' + this.model.catalogLinks + '" class="' + this.model.catalogTraining + '-anchor">' + this.model.get( 'ResourceName' ) + '</a>' );
			}

			$( '#modal-content' ).on( 'show.bs.modal', function () {
				$( '#footer' ).css( 'position','relative' );
			} );

			$( '#modal-content' ).on( 'hidden.bs.modal', function () {
				$( '#footer' ).css( 'position','absolute' );
			} );
		}

	} );

} );
