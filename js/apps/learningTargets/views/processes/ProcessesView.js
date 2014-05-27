define( function ( require ) {
	'use strict';

	var Marionette             = require( 'marionette' );
	var EmptyView              = require( 'apps/learningTargets/views/EmptyView' );
	var ProcessesCompositeView = require( 'apps/learningTargets/views/processes/ProcessesCompositeView' );

	return Marionette.CollectionView.extend( {
		'itemView'  : ProcessesCompositeView,
		'tagName'   : 'ul',
		'emptyView' : EmptyView,
		'className' : 'lt-list media-list'
	} );

} );
