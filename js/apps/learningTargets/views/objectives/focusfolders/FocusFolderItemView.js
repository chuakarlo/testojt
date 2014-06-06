define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/objectives/focusfolder.html' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
		'tagName'   : 'li',
		'className' : 'col-xs-12 col-sm-4 col-md-4',

		'ui' : {
			'InfoButton' : '.fo-showinfo'
		},
		'events' : {
			'click @ui.InfoButton' : 'showDescription'
		},

		'showDescription' : function ( e ) {
			if ( $( e.currentTarget ).hasClass( 'text-muted') ) {
				$( e.currentTarget ).addClass( 'fa-times-circle text-primary' ).removeClass( 'fa-info-circle text-muted' );
				this.$( '.fo-overlay-details' ).removeClass( 'hide' );
			} else {
				this.$( '.fo-overlay-details' ).addClass( 'hide' );
				$( e.currentTarget ).addClass( 'fa-info-circle text-muted' ).removeClass( 'fa-times-circle text-primary' );
			}
		}

	} );

} );
