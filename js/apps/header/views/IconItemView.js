define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template = require( 'text!header/templates/IconItemTemplate.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'tagName'   : 'li',
		'className' : 'col-xs-12 col-sm-4 col-md-2',

		'getTarget' : function () {
			if ( this.model.get( 'target' ) ) {
				return 'target="' + this.model.get( 'target' ) + '"';
			}

			return '';
		},

		'templateHelpers' : function () {
			return {
				'target' : this.getTarget()
			};
		}

	} );

} );
