define( function ( require ) {
	'use strict';

	var App = require( 'App' );
	var _   = require( 'underscore' );

	App.module( 'Groups.Show', function ( Mod ) {

		Mod.ForumController = App.Common.Controllers.BaseController.extend( {

			'initialize' : function ( options ) {

				this.model = options.model;
				this.layout = options.layout;
				_.bindAll( this, 'showForums' );
			},

			'showForums' : function () {

				this.layout.groupsContentRegion.close();

				var pd360Loaded = App.request( 'pd360:loaded' );

				App.when( pd360Loaded )
					.done( _.bind( function () {
						this.layout.flashLoadingRegion.close();
						App.request( 'pd360:navigate', 'communities', 'communitiesBrowse', {
							'LocationTypeId' : 5,
							'LocationId'     : this.model.get( 'LicenseId' )
						} );
					}, this ) );
			}

		} );

	} );

} );
