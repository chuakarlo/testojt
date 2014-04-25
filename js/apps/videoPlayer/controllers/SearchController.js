define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );

	App.module( 'VideoPlayer.Controller', function ( Controller ) {

		Controller.Search = {

			'searchPeopleAndGroups' : function ( filter ) {
				var searchRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
					'method' : 'RespondSearchGroupsAndUsers',
					'args'   : {
						'personnelId' : Session.personnelId(),
						'searchData'  : filter
					}
				};

				return Remoting.fetch( searchRequest );
			}

		};

	} );

} );
