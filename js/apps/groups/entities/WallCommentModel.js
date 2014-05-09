define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	App.module( 'Entities', function ( Mod ) {

		Mod.WallCommentModel = Backbone.CFModel.extend( {

			'path' : 'groups.GroupMessagesGateway',

			'defaults' : {
				'MessageThreadId' : '',
				'MessageId'       : '',
				'LicenseId'       : '',
				'Message'         : '',
				'Creator'         : '',
				'Created'         : '',
				'CreatorAvatar'   : '',
				'CreatorFullName' : '',
				'Remover'         : '',
				'Removed'         : ''
			},

			'initialize' : function ( attributes, options ) {
				options = options || { };
				this.reply = options.reply || false;
			},

			'getCreateOptions' : function () {
				var method = 'createNewMessage';
				if (this.reply) {
					method = 'respondToMessage';
				}

				return {
					'method'     : method,
					'objectPath' : 'groups.GroupMessages',
					'args'       : this.toJSON()
				};
			},

			'getDeleteOptions' : function () {
				var args = this.toJSON();

				// This could contain an attribute storing the children replies
				// that need to be deleted removed before sending to the server
				args.replies = null;
				args.id = null;
				delete args.replies;
				delete args.id;

				return {
					'method'     : 'deleteByObj',
					'objectPath' : 'groups.GroupMessages',
					'args'       : args
				};
			}

		} );

	} );

} );
