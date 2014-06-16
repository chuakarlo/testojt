define( function ( require ) {
	'use strict';

	var Marionette                  = require( 'marionette' );
	var EmptyView                   = require( 'apps/learningTargets/views/EmptyView' );
	var template                    = require( 'text!apps/learningTargets/templates/processes/processes.html' );
	var ProcessesCompositeView      = require( 'apps/learningTargets/views/processes/ProcessesCompositeView' );
	var _                           = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : ProcessesCompositeView,
		'tagName'           : 'div',
		'className'         : 'lt-content-processes',
		'emptyView'         : EmptyView,
		'itemViewContainer' : '.lt-accordion'
	} );

} );
