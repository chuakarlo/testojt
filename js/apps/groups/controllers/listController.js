define( function ( require ) {
	'use strict';

	var GroupCollection = require( '../collections/GroupCollection' );
	var Remoting        = require( 'Remoting' );
	var App             = require( 'App' );
	var $               = require( 'jquery' );

	App.module( 'Groups.List', function ( List ) {

		List.Controller = {

			'listGroups' : function () {

				// get general groups info
				var groupsRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'getValidGroupsByPersonnelIdOrderedByRecentActivity',
					'args'   : {
						'persId' : $.cookie( 'PID' ) || null
					}
				};

				var requests     = [ groupsRequest ];
				var fetchingData = Remoting.fetch( requests );

				$.when( fetchingData ).done( function ( results ) {

					var groups = new GroupCollection( results[ 0 ] );

					var groupsView = new App.Groups.Views.List( { 'collection' : groups } );
					App.content.show( groupsView );

				} ).fail( function ( error ) {
					// TODO: error handling
				} );

			}

		};

	} );

} );
