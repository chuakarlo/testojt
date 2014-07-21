define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var App        = require( 'App' );
	var template   = require( 'text!apps/homepage/external/billboard/templates/billboardView.html' );
	var controller = require( 'apps/homepage/external/billboard/controllers/billboardController' );

	return Marionette.ItemView.extend( {

		'template'          : _.template( template ),
		'className'         : 'wide-container-fluid resources section-container',
		'id'                : 'billboard-container',
		'events' : {
			'click a.videoplay' : 'redirect',
			'click a.videoLink' : 'extRedirect'
		},

		'initialize' : function () {
			controller.doInitialize( this );
		},

		'templateHelpers' : function () {
			return controller.setTemplateHelpers( this );
		},

		'onRender' : function () {
			if ( App.request( 'homepage:isHomeRoute' ) ) {
				controller.doOnRender( this );
			}
		},

		'onShow' : function () {
			// This lets the home controller know this view is ready to display
			// the bootstro element
			App.vent.trigger( 'bootstro:itemLoaded' );
		},

		'redirect' : function ( e ) {
			controller.doRedirect( e );
			return false;
		},

		'extRedirect' : function ( e ) {
			return App.Homepage.Utils.navigate( $( e.currentTarget ).attr( 'data-url' ) );
		}
	} );

} );
