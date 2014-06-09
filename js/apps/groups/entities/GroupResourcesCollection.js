define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	require( './GroupResourceFileModel' );

	App.module( 'Entities', function ( Mod ) {

		var groupIdError = function () {
			throw new Error( 'The groupId option is required' );
		};

		Mod.GroupResourcesCollection = Backbone.CFCollection.extend( {

			'model' : App.Entities.GroupResourceFileModel,

			'path'   : 'CommunityService',

			'typeMap' : {
				'leader' : 9,
				'member' : 11
			},

			'initialize' : function ( models, options ) {
				options = options || { };

				if ( !options.groupId ) {
					groupIdError();
				}

				this.groupId = options.groupId;
				this.fileType = options.fileType || 'leader';
			},

			'getReadOptions' : function () {
				return {
					'method' : 'getFileUploadsByTypeAndLocationAndFileType',
					'args'   : {
						'locationTypeId' : 5,
						'locationId'     : this.groupId,
						'fileTypeId'     : this.typeMap[ this.fileType ],
						'startRow'       : 0,
						'maxRows'        : 500
					}
				};
			}

		} );
	} );

} );
