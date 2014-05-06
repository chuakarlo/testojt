define( function ( require ) {
	'use strict';

	var Marionette         = require( 'marionette' );
	var template           = require( 'text!apps/learningTargets/templates/portfolios/portfolios.html' );
	var portfoliosItemView = require( 'apps/learningTargets/views/portfolios/PortfoliosItemView' );
	var _                  = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : portfoliosItemView,
		'itemViewContainer' : 'ul.lt-list'
	} );

} );
