define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/catalogs/catalog.html' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),
		'tagName'  : 'li',
		'ui'       : {
			'drawerToggleButton' : '.lt-toggle-btn'
		},
		'events' : {
			'click div.catalog-item' : 'showCatalogDescription'
		},
		'showCatalogDescription' : function ( e ) {
			e.preventDefault();

			this.trigger( 'lt:showdescription' );
		}
	} );
} );
