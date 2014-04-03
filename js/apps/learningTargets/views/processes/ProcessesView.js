define( function ( require ) {
	'use strict';

	var Marionette        = require( 'marionette' );
	var template          = require( 'text!apps/learningTargets/templates/processes/processes.html' );
	var ProcessesItemView = require( 'apps/learningTargets/views/processes/ProcessesItemView' );
	var _                 = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : ProcessesItemView,
		'itemViewContainer' : 'ul.lt-list',
	} );

} );
