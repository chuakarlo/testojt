define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var App        = require( 'App' );
	var Marionette = require( 'marionette' );

	var FooterView = require( 'apps/footer/views/FooterView' );
	var ImageView  = require( 'apps/footer/views/ImageView' );

	App.module( 'Footer', function ( Mod ) {

		Mod.addInitializer( function() {

			Mod.ShowController = Marionette.Controller.extend( {

				'initialize' : function() {
					_.bindAll( this, 'determineBranding' );
				},

				'showFooter' : function() {
					this.footerView = new FooterView();
					App.footerRegion.show(this.footerView);
					this.buildBranding();
				},

				// TODO : This isn't complete as we still need the logic to
				// determine which BrandingImage to use.
				'buildBranding' : function() {
					var licenses = App.request( 'user:licenses' );
					$.when( licenses ).done( this.determineBranding );
				},

				'determineBranding' : function( licenses ) {

					var filtered = licenses.where( { 'LicenseTypeId' : 1 });

					var banners = _.reject(filtered, function( l ) {
						var img = l.get( 'BrandingImage' );
						if (img !== '' && img !== 'default.png' ) {
							return false;
						}
						return true;
					} );

					var banner = _.last(banners);

					if (banner) {

						var imageView = new ImageView( {
							'model' : banner
						} );

						this.footerView.imageRegion.show( imageView );
					}

				}
			} );

			var showController = new Mod.ShowController();

			showController.showFooter();
		} );
	} );

} );
