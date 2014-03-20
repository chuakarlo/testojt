define( function ( require ) {
	'use strict';

	var Remoting = require( 'Remoting' );
	var $        = require( 'jquery' );

	return function ( Edit, App ) {

		Edit.Controller = {

			'leaveGroup' : function ( model ) {

				// leave public group
				var leaveGroupRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.AdminService',
					'method' : 'returnASeatToLicense',
					'args'   : {
						'persId'    : $.cookie( 'PID' ),
						'licId'     : model.attributes.LicenseId,
						'removerId' : model.attributes.Creator
					}
				};

				var requests     = [ leaveGroupRequest ];
				var fetchingData = Remoting.fetch( requests );

				$.when( fetchingData ).done( function ( results ) {

					App.navigate( 'groups', { 'trigger' : true } );

				} ).fail( function ( error ) {
					// TODO: error handling
				} );

			},

			'joinGroup' : function ( model ) {

				// join public group
				var joinGroupRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.AdminService',
					'method' : 'takeASeatFromLicense',
					'args'   : {
						'persId'    : $.cookie( 'PID' ),
						'licId'     : model.attributes.LicenseId,
						'creatorId' : model.attributes.Creator
					}
				};

				var requests     = [ joinGroupRequest ];
				var fetchingData = Remoting.fetch( requests );

				$.when( fetchingData ).done( function ( results ) {

					App.navigate( 'groups', { 'trigger' : true } );

				} ).fail( function ( error ) {
					// TODO: error handling
				} );

			}

		};

	};

} );
