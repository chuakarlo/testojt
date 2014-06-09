define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );

	App.module( 'Entities', function ( Mod ) {

		Mod.GroupResourceFileModel = Backbone.CFModel.extend( {

			'path'   : 'RespondService',

			'defaults' : {
				'FileId'          : 0,
				'PersonnelId'     : 0,
				'FileName'        : '',
				'FilePath'        : '',
				'FileTypeId'      : 0,
				'FileDescription' : '',
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
					'method' : 'RespondUploadFileUploadWithThreadAssociation',
					'args'   : this.toJSON()
				};
			},

			'updateViewCount' : function () {

				var request = {
					'path'   : 'com.schoolimprovement.pd360.dao.CommunityService',
					'method' : 'setRecentViewings',
					'args'   : {
						'TargetTypeId' : 3,
						'TargetId'     : this.get( 'FileId' ),
						'PersonnelId'  : parseInt( Session.personnelId() )
					}
				};

				return Remoting.fetch( request );

			},

			'storedFilename' : function () {
				var fileName = this.get( 'FileName' );
				var ext = fileName.substr( fileName.lastIndexOf( '.' ), fileName.length );
				return 'file_' + this.get( 'FileId' ) +
					'_' + Session.personnelId() + ext;
			},

			'generateDownloadUrl' : function () {
				var deferred = new $.Deferred();

				var config = App.request( 'session:config' );
				// build URL of the file
				var url      = config.fileStoragePathTrunc + this.storedFilename();
				var time     = ( new Date() ).getTime();

				// generate hash request
				var hashRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.AdminService',
					'method' : 'akamaiTokenizer',
					'args'   : {
						'url'    : url,
						'param'  : config.akamaiParam,
						'window' : config.akamaiTTL,
						'salt'   : '791kirk8686',
						'time'   : time
					}
				};

				var request = Remoting.fetch( hashRequest );

				App.when( request ).done( _.bind( function ( res ) {
					var serverUrl = config.FileURL;
					var hashedUrl = res[ 0 ];
					var fileUrl = '&OriginalFileName=' + this.get( 'FileName' );

					deferred.resolve( serverUrl + '?FilePath=' + hashedUrl + fileUrl );
				}, this ) );

				return deferred.promise();

			}

		} );
	} );

} );
