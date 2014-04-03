define( function ( require ) {
	'use strict';

	var Marionette           = require( 'marionette' );
	var template             = require( 'text!apps/learningTargets/templates/observations/observations.html' );
	var observationsItemView = require( 'apps/learningTargets/views/observations/ObservationsItemView' );
	var _                    = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : observationsItemView,
		'itemViewContainer' : 'ul.lt-list',
	} );

} );
