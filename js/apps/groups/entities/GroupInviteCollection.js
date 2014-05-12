define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	var emailAddress;

	var Invites = Backbone.CFCollection.extend( {

		'getReadOptions' : function () {
			return {
				'method' : 'getGroupMembershipInvites',
				'args'   : {
					'emailAddress' : emailAddress
				}
			};
		},

		'path' : 'GroupService',

		'comparator' : 'LicenseName'

	} );

	var API = {

		'initializeInvites' : function ( defer ) {
			var invites = new Invites();

			invites.fetch( {

				'success' : function () {
					invites.each( function ( invite ) {
						invite.set( { 'InviteeEmail' : emailAddress } );
					} );

					defer.resolve( invites );
				},

				'error' : function () {
					defer.reject( 'There was an error fetching group invites.' );
				}

			} );
		},

		'getGroupInvites' : function () {
			var defer = App.Deferred();

			App.when( App.request( 'user:personnel' ) )

			.done( function ( personnel ) {

				emailAddress = personnel.get( 'EmailAddress' );
				this.initializeInvites( defer );

			}.bind( this ) )

			.fail( function ( error ) {
				defer.reject( error );
			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'user:groups:invites', function () {
		return API.getGroupInvites();
	} );

} );
