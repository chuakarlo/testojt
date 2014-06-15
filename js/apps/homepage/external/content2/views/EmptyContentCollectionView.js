define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/content2/templates/emptyContentCollectionView.html' );

	function getTemplate () {
		return _.template( template );
	}

	return Marionette.ItemView.extend( {
		'tagName'    : 'div',
		'className'  : 'empty-view',
		'template'   :  getTemplate(),
		'initialize' : function ( options ) {
			this.templateHelpers = {
				'heading' : options.heading,
				'details' : options.details
			};
		}
	} );
} );
