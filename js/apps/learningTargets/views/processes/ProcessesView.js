define( function ( require ) {
	'use strict';

	var Marionette             = require( 'marionette' );
	var ProcessesCompositeView = require( 'apps/learningTargets/views/processes/ProcessesCompositeView' );

	return Marionette.CollectionView.extend( {
		'itemView'  : ProcessesCompositeView,
		'tagName'   : 'ul',
		'className' : 'lt-list media-list'
	} );

} );
