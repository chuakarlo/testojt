define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var template        = require( 'text!apps/learningTargets/templates/observations/observation.html' );
	var _               = require( 'underscore' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),
		'tagName'  : 'li',
		'ui'       : {
			'linkBtn' : '.lt-link'
		},

		'events' : {
			'click @ui.linkBtn' : 'showLegacyApp'
		},

		'showLegacyApp' : function ( e ) {
			e.preventDefault();
			var self = this;
			self.trigger( 'lt:redirect', 'observation', 'observationOfMe', { 'showPerFocus' : self.model.get( 'OBSERVATIONID' ) } );
		},

		'onRender' : function () {
			var self = this;
			if ( self.model.get( 'OBSERVATIONID' ) === self.model.collection.selectedObeservationId ) {
				self.$el.find( '.lt-link' ).trigger( 'click' );
			}
		}

	} );

} );
