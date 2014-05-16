define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var _          = require( 'underscore' );

	require( 'common/controllers/BaseController' );

	App.module( 'Groups.Show', function ( Mod ) {

		Mod.SideController = App.Common.Controllers.BaseController.extend( {

			'initialize' : function ( options ) {

				this.layout = options.layout || null;
				this.model = options.model;
				this.lastGroupId = null;

				_.bindAll( this, 'showGroup');
			},

			'getData' : function ( groupId ) {

				App.when(
					this.model.getMembers( 8 ),
					this.model.getLastUpdate()
				).done( this.showGroup );

			},

			'showGroup' : function ( collection, lastUpdate ) {

				this.model.set( 'lastUpdated', lastUpdate[ 0 ]);

				var infoView = new App.Groups.Views.Info( {
					'model'      : this.model,
					'collection' : collection
				} );

				this.layout.groupInfoRegion.show( infoView );

			}

		} );

	} );

} );
