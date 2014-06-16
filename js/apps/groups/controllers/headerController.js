define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var App        = require( 'App' );
	var Session    = require( 'Session' );

	require( 'common/controllers/BaseController' );

	App.module( 'Groups.Show', function ( Mod ) {

		Mod.HeaderController = App.Common.Controllers.BaseController.extend( {

			'initialize' : function ( options ) {
				this.layout = options.layout;
				this.model = options.model;
				this.isMember = options.isMember;
				this.lastGroupId = null;

				_.bindAll( this, 'showGroup');
			},

			'getData' : function ( groupId ) {
				this.lastGroupId = groupId;
				App.when(
					this.model.userIsAdmin( Session.personnelId() ),
					this.model.userIsGroupMember( Session.personnelId() )

				).done( this.showGroup );
			},

			'showGroup' : function ( isAdmin, isMember ) {
				// Check to see if this is the current group being viewed,
				// otherwise fetch and display the appropriate data.

				var bannerView = new App.Groups.Views.Banner( {
					'model'          : this.model,
					'userGroupAdmin' : isAdmin[ 0 ]
				} );

				this.layout.bannerRegion.show( bannerView );

				// group name
				var headerView = new App.Groups.Views.Header( {
					'model' : this.model
				} );

				this.layout.headerRegion.show( headerView );

				// group sub navigation ( tabs )
				if ( isMember[ 0 ] ) {
					var subNavView = new App.Groups.Views.SubNav( {
						'model' : this.model
					} );
					this.layout.subNavRegion.show( subNavView );
				}

			}

		} );

	} );

} );
