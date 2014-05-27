define( function ( require ) {
	'use strict';

	var Marionette         = require( 'marionette' );
	var template           = require( 'text!apps/learningTargets/templates/portfolios/portfolios.html' );
	var portfoliosItemView = require( 'apps/learningTargets/views/portfolios/PortfoliosItemView' );
	var EmptyView          = require( 'apps/learningTargets/views/EmptyView' );
	var _                  = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : portfoliosItemView,
		'emptyView'         : EmptyView,
		'itemViewContainer' : 'ul.lt-list'
	} );

} );
