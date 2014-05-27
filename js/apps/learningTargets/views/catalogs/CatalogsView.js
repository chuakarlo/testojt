define( function ( require ) {
	'use strict';

	var Marionette       = require( 'marionette' );
	var template         = require( 'text!apps/learningTargets/templates/catalogs/catalogs.html' );
	var CatalogsItemView = require( 'apps/learningTargets/views/catalogs/CatalogsItemView' );
	var EmptyView        = require( 'apps/learningTargets/views/EmptyView' );
	var _                = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : CatalogsItemView,
		'emptyView'         : EmptyView,
		'itemViewContainer' : 'ul.lt-list'
	} );

} );
