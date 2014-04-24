define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var template        = require( 'text!apps/learningTargets/templates/portfolios/portfolio.html' );
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
			
			self.trigger( 'lt:redirect', 'home', 'homePortfolio', {
				'soughtPortfolioId' : self.model.get( 'LEARNINGPLANID' )
			} );
		}

	} );

} );
