define( function ( require ) {
	'use strict';

	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.QueueContent = Backbone.CFModel.extend( {

			'idAttribute' : 'ContentId'

		} );

		Entities.QueueContents = Backbone.CFCollection.extend( {

			'path'       : 'core.ClientPersonnelBookmarkGateway',
			'objectPath' : 'core.ClientPersonnelBookmark',
			'model'      : Entities.QueueContent,

			'getCreateOptions' : function ( model ) {
				return {
					'objectPath' : this.objectPath,
					'method'     : 'create',
					'args'       : {
						'PersonnelId' : Session.personnelId(),
						'ContentId'   : model.id,
						'Created'     : ''
					}
				};
			},

			'getReadOptions' : function () {
				return {
					'method' : 'getContentAbbrevListByPersonnelId',
					'args'   : {
						'personnelId' : Session.personnelId()
					}
				};
			},

			'getDeleteOptions' : function ( model ) {
				return {
					'objectPath' : this.objectPath,
					'method'     : 'deleteByObj',
					'args'       : {
						'PersonnelId' : Session.personnelId(),
						'ContentId'   : model.id,
						'Created'     : ''
					}
				};
			}

		} );

		var API = {
			'getContents' : function () {
				var defer    = App.Deferred();
				var contents = new Entities.QueueContents();

				contents.fetch( {

					'success' : function () {
						defer.resolve( contents );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching queue contents' ) );
					}

				} );

				return defer.promise();
			}
		};

		App.reqres.setHandler( 'common:getQueueContents', function () {
			return API.getContents();
		} );

	} );

} );
