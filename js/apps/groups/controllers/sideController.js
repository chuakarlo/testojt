define( function ( require ) {
	'use strict';

	var App     = require( 'App' );
	var _       = require( 'underscore' );
	var Session = require( 'Session' );

	App.module( 'Groups.Show', function ( Mod ) {

		Mod.SideController = App.Common.Controllers.BaseController.extend( {

			'initialize' : function ( options ) {

				this.layout = options.layout || null;
				this.model = options.model;
				this.lastGroupId = null;
				this.displayLocation = options.displayLocation || 'side';

				_.bindAll( this, 'showGroup' );
			},

			'getData' : function ( groupId ) {

				if ( this.lastGroupId !== groupId ) {

					this.lastGroupId = groupId;

					App.when(
						this.model.getMembers( 8 ),
						this.model.getLastUpdate(),
						this.model.userIsGroupMember( Session.personnelId() )
					).done( this.showGroup );

				}
			},

			'showGroup' : function ( collection, lastUpdate, isMember ) {

				if ( this.getCurrentPage() !== 'forums' ) {

					this.model.set( 'lastUpdated', lastUpdate[ 0 ] );

					var infoView = new App.Groups.Views.Info( {
						'model'      : this.model,
						'collection' : collection,
						'isMember'   : isMember[ 0 ]
					} );

					if ( this.displayLocation === 'side' ) {
						this.layout.groupInfoRegion.show( infoView );
					} else {
						this.layout.groupsContentRegion.show( infoView );
					}

				}

			}

		} );

	} );

} );
