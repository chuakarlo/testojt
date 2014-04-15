define( function ( require ) {
	'use strict';

	var Marionette           = require( 'marionette' );
	var _                    = require( 'underscore' );
	var template             = require( 'text!apps/homepage/external/what-to-do-next/templates/widgetCompositeView.html' );
	var controller = require( 'apps/homepage/external/what-to-do-next/controllers/widgetCompositeController' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'tagName'           : 'li',
		'className'         : 'col-md-4 no-padding',
		'itemViewContainer' : '.item-container',

		'initialize' : function ( options ) {
			controller.doInitialize( this, options );
		},
		'templateHelpers'   : function () {
			return controller.setTemplateHelpers( this );
		},
		'onRender'         : function ( parent ) {
			controller.doOnRender( this, parent );
		}
	} );

} );
