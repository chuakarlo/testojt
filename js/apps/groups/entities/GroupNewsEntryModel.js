define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	App.module( 'Entities', function ( Mod ) {

		Mod.GroupNewsEntryModel = Backbone.CFModel.extend( {

			'path'   : 'groups.GroupNewsGateway',

			'defaults' : {
				'LicenseId' : 0,
				'NewsEntry' : '',
				'NewsId'    : 0,
				'Created'   : '',
				'Creator'   : ''
			},

			'getCreateOptions' : function () {
				return {
					'objectPath' : 'groups.GroupNews',
					'method'     : 'create',
					'args'       : this.toJSON()
				};
			}

		} );
	} );

} );
