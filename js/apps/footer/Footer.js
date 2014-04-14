define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var App        = require( 'App' );
	var Marionette = require( 'marionette' );

	var FooterView = require( 'apps/footer/views/FooterView' );

	App.module( 'Footer', function ( Mod ) {

		Mod.addInitializer( function() {

			Mod.ShowController = Marionette.Controller.extend( {

				'showFooter' : function() {
					this.footerView = new FooterView();
					App.footerRegion.show(this.footerView);
				},

				// TODO : This isn't complete as we still need the logic to
				// determine which BrandingImage to use.
				'showBranding' : function() {
					var licenses = App.request( 'user:licenses' );
					$.when( licenses ).done( function( licenses ) {
						var banners = _.reject(licenses.models, function( l ) {
							var img = l.get( 'BrandingImage' );
							if (img !== '' && img !== 'default.png' ) {
								return false;
							}
							return true;
						} );
						return banners;
					} );
				}
			} );

			var showController = new Mod.ShowController();

			showController.showFooter();
		} );
	} );

} );
