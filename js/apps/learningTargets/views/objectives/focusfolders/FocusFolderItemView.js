define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var template        = require( 'text!apps/learningTargets/templates/objectives/focusfolder.html' );
	var _               = require( 'underscore' );
	var $               = require( 'jquery' );
	var getAbbreviation = require( 'common/helpers/getAbbreviation' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
		'tagName'   : 'li',
		'className' : 'col-xs-6 col-sm-6 col-md-4',

		'ui' : {
			'InfoButton' : '.fo-showinfo'
		},
		'events' : {
			'click @ui.InfoButton' : 'showDescription'
		},

		'showDescription' : function ( e ) {
			if ( $( e.currentTarget ).hasClass( 'text-muted') ) {
				$( e.currentTarget ).addClass( 'fa-times-circle text-primary' ).removeClass( 'fa-info-circle text-muted' );
				this.$( '.fo-overlay-details' ).show();
			} else {
				this.$( '.fo-overlay-details' ).hide();
				$( e.currentTarget ).addClass( 'fa-info-circle text-muted' ).removeClass( 'fa-times-circle text-primary' );
			}
		},

		'_setDescriptionIcon' : function ( model ) {
			if ( model.StateStandardDescription.length <= 0 ) {
				model.DescIcon = 'hide';
			}

			return model;
		},

		'templateHelpers' : function ( ) {
			var model = this.model;
			model.DescIcon = '';

			model.SSTitle  = getAbbreviation ( model.get( 'StateStandardTitle' ), 50 );
			if ( model.get( 'StateStandardDescription' ).length <= 0 ) {
				model.DescIcon = 'hide';
			}

			return model;
		}

	} );

} );
