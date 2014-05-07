define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var Session    = require( 'Session' );
	var bootstro   = require( 'bootstro' );

	var template = require( 'text!apps/homepage/templates/baseItemView.html' );

	return Marionette.Layout.extend( {

		'className' : 'home-container',

		'template'   : _.template( template ),

		'regions' : {
			'messageRegion' : '#home-page-message',
			'contentRegion' : '#Home-page-view'
		},

		'onShow' : function () {
			this.showWizzard();
		},

		'showWizzard' : function () {
			var personnelRequest = App.request( 'user:personnel' );

			App.when( personnelRequest ).done( function ( personnel ) {

				if ( Session.useWizards() && window.innerWidth >= 768 ) {
					setTimeout( function () {
						bootstro.start( null, {
							'margin' : '50px',

							'onStep' : function () {
								$( 'html, body' ).animate( {
									'scrollTop' : $( '.bootstro-highlight' ).offset().top * 0.8
								}, 100 );
							},

							'onExit' : function () {
								personnel.save( { 'UseWizards' : 0 }, {
									'success' : function () {
										$.cookie( 'USEWIZARDS', 0 );
									}
								} );
							}
						} );
					}, 1000 );
				}

			} );

		}

	} );
} );
