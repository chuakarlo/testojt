define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var settings   = require( 'apps/homepage/external/content/configuration/emptyContentSettings' );
	var controller = require( 'apps/homepage/external/content/controllers/emptyContentController' );

	return Marionette.ItemView.extend( {

		'template' : _.template( '' ),
		'className' : 'loading-container',

		'initialize' : function () {
			controller.doInitialize( this );
		},

		'onRender' : function () {
			if ( App.request( 'homepage:isHomeRoute' ) ) {
				controller.doOnRender( this );
			}
		},

		'onClose' : function () {
			controller.doOnClose( this );
		},

		'_getOptions' : function () {
			return settings;
		}
	} );
} );
