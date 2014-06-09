define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	App.module( 'Entities', function ( Mod ) {

		Mod.GroupResourceLinkModel = Backbone.CFModel.extend( {

			'path'   : 'RespondService',

			'defaults' : {
				'LinkId'          : 0,
				'PersonnelId'     : 0,
				'LinkURL'         : '',
				'LinkTypeId'      : 0,
				'LinkDescription' : '',
				'LocationTypeId'  : 5,
				'LocationId'      : '',
				'Rank'            : 0,
				'ViewCount'       : 0,
				'Disable'         : 0,
				'IsTask'          : 0,
				'Created'         : '',
				'Creator'         : 0,
				'threadId'        : 0,
				'postId'          : 0
			},

			'getCreateOptions' : function () {
				return {
					'method' : 'RespondLinkCreateWithThreadAssociation',
					'args'   : this.toJSON()
				};
			}

		} );
	} );

} );
