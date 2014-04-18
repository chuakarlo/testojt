define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var App        = require( 'App' );
	var Vent       = require( 'Vent' );
	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var Session    = require( 'Session' );

	var FooterView = require( 'apps/footer/views/FooterView' );
	var ImageView  = require( 'apps/footer/views/ImageView' );

	App.module( 'Footer', function ( Mod ) {

		Mod.addInitializer( function() {

			Mod.ShowController = Marionette.Controller.extend( {

				'initialize' : function() {
					_.bindAll( this, 'determineBranding' );
					this.listenTo(Vent, 'login:success', this.buildBranding);
					this.listenTo(Vent, 'pd360:logout', this.buildBranding);
				},

				'showFooter' : function() {
					this.footerView = new FooterView();
					App.footerRegion.show(this.footerView);
					this.buildBranding();
				},

				'buildBranding' : function() {
					if ( Session.authenticated() ) {
						var licenses = App.request( 'user:licenses' );
						$.when( licenses ).done( this.determineBranding );
					} else {
						this.defaultBranding();
					}
				},

				'determineBranding' : function( licenses ) {
					// Determine if they have any district or school branding.
					// Eventually need to have logic giving the proper priority
					// on which branding image to display. This should really
					// be handled on the backend.
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
					// No branding image found
					} else {
						this.defaultBranding();
					}
				},

				'defaultBranding' : function() {
					// Display the default PD 360 Image
					var imageView = new ImageView( {
						'model' : new Backbone.Model( {
							'BrandingImage' : 'img/pd-360.png'
						} )
					} );

					this.footerView.imageRegion.show( imageView );
				},

			} );

			var showController = new Mod.ShowController();

			showController.showFooter();
		} );
	} );

} );
