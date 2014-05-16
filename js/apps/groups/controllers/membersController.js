define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var App        = require( 'App' );

	require( 'common/controllers/BaseController' );

	App.module( 'Groups.Show', function ( Mod ) {

		Mod.MembersController = App.Common.Controllers.BaseController.extend( {

			'initialize' : function ( options ) {
				this.layout = options.layout;
				this.model = options.model;
				_.bindAll( this, 'showGroup');
			},

			'getData' : function ( groupId ) {
				this.layout.groupsContentRegion.show( new App.Common.LoadingView() );
				$.when( this.model.getMembers() )
					.done( this.showGroup );
			},

			'showGroup' : function ( collection ) {
				var membersView = new App.Groups.Views.Members( {
					'model'      : this.model,
					'collection' : collection
				} );

				this.layout.groupsContentRegion.show( membersView );
			}

		} );

	} );

} );
