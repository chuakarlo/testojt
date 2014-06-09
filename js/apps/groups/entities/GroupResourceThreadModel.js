define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	App.module( 'Entities', function ( Mod ) {

		Mod.GroupResourceThreadModel = Backbone.CFModel.extend( {

			'path'   : 'community.ForumThreadsGateway',

			'defaults' : {
				'ForumThreadId'  : 0,
				'PersonnelId'    : 0,
				'Title'          : '',
				'Sticky'         : 0,
				'Locked'         : 0,
				'Disabled'       : 0,
				'NoPosts'        : 0,
				'ViewCount'      : 0,
				'ReplyCount'     : 0,
				// What does 5 represent
				'LocationTypeId' : 5,
				'Rank'           : 0,
				'LocationId'     : 0,
				'IsTask'         : 0,
				'Created'        : '',
				'Creator'        : 0,
				'Removed'        : '',
				'Remover'        : 0
			},

			'getCreateOptions' : function () {
				return {
					'method'     : 'save',
					'objectPath' : 'community.ForumThreads',
					'args'       : this.toJSON()
				};
			}

		} );
	} );

} );
