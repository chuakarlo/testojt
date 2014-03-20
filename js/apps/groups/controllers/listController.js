define( function ( require ) {
	'use strict';

	var Remoting        = require( 'Remoting' );
	var GroupCollection = require( '../collections/GroupCollection' );
	var GroupsView      = require( '../views/GroupsView' );
	var $               = require( 'jquery' );

	return function ( List, App ) {

		List.Controller = {

			'listGroups' : function () {

				// get general groups info
				var groupsRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'getValidGroupsByPersonnelIdOrderedByRecentActivity',
					'args'   : {
						'persId' : $.cookie( 'PID' )
					}
				};

				var requests     = [ groupsRequest ];
				var fetchingData = Remoting.fetch( requests );

				$.when( fetchingData ).done( function ( results ) {

					var groups = new GroupCollection( results[ 0 ] );

					var groupsView = new GroupsView( { collection : groups } );
					App.content.show( groupsView );

				} ).fail( function ( error ) {
					// TODO: error handling
				} );

			}

		};

	};

} );
