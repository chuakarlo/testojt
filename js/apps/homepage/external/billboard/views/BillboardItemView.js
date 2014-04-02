define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/billboard/templates/billboardView.html' );
	var controller = require( 'apps/homepage/external/billboard/controllers/billboardController' );

	return Marionette.ItemView.extend( {

		'template'        : _.template( template ),
		'className'       : 'wide-container-fluid resources section-container',
		'id'              : 'billboard-container',

		'initialize'      : function ( options ) {
			controller.doInitialize( this );
		},

		'templateHelpers' : function () {
			return controller.setTemplateHelpers( this );
		},

		'onRender'        : function ( parent ) {
			controller.doOnRender( parent );
		}
	} );

} );