define( function ( require ) {
	'use strict';

	var App                 = require( 'App' );
	var _                   = require( 'underscore' );

	var Session             = require( 'Session' );

	require( 'common/controllers/BaseController' );

	App.module( 'Groups.Show', function ( Mod ) {

		Mod.LeaderController = App.Common.Controllers.BaseController.extend( {

			'initialize' : function ( options ) {

				this.model = options.model;
				this.layout = options.layout;
			},

			'getData' : function ( groupId ) {
				var persId = Session.personnelId();
				var pd360Loaded = App.request( 'pd360:loaded' );

				this.layout.groupsContentRegion.show( new App.Common.LoadingView() );

				this.model.fetch( {
					'success' : _.bind( function ( model, res, options) {
						App.when(
							model.userIsAdmin( persId ),
							model.userIsCreator( persId ),
							pd360Loaded
						).done( _.bind( function ( groupAdmin, groupCreator ) {

							if ( groupAdmin[ 0 ] === true || groupCreator === true ) {
								this.showTools();
							} else {
								App.navigate( 'home', {
									'trigger' : true
								} );
							}
						}, this ) );

					}, this )
				} );

			},

			'showTools' : function () {
				this.layout.groupsContentRegion.close();
				this.layout.groupInfoRegion.close();
				App.request( 'pd360:navigate', 'communities', 'groupsBrowse', {
					'LicenseId' : this.model.get( 'LicenseId' )
				} );
			}

		} );

	} );

} );
