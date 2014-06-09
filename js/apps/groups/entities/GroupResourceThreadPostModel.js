define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	App.module( 'Entities', function ( Mod ) {

		Mod.GroupResourceThreadPostModel = Backbone.CFModel.extend( {

			'path'   : 'CommunityService',

			'defaults' : {
				'ForumThreadId'    : 0,
				'ForumPostId'      : 0,
				'PersonnelId'      : 0,
				'Subject'          : '',
				'Text'             : '',
				'AttachmentFileId' : 0,
				'Rank'             : 0,
				'Created'          : '',
				'Creator'          : '',
				'Modified'         : '',
				'Modifier'         : 0,
				'Removed'          : '',
				'Remover'          : 0
			},

			'getCreateOptions' : function () {
				return {
					'method'     : 'forumPostsCreateWithThreadIncrement',
					'objectPath' : 'community.ForumPosts',
					'args'       : this.toJSON()
				};
			}

		} );
	} );

} );
