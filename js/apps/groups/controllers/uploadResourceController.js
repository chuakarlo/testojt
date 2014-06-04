define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Remoting   = require( 'Remoting' );
	var $          = require( 'jquery' );

	App.module( 'Groups.Upload', function ( Upload ) {
		Upload.Controller = {

			'uploadPage' : function ( options ) {

				this.groupModel = options.groupModel;
				this.userStatus = options.userStatus;

				this.layout     = new App.Groups.Views.UploadResource( {
					'groupModel' : this.groupModel
				} );

				App.content.show( this.layout );
			},

			'uploadResource' : function ( data ) {
				var date = new Date();
				date = date.toString();
				var threadRequest = {
					'path'       : 'com.schoolimprovement.pd360.dao.community.ForumThreadsGateway',
					'objectPath' : 'com.schoolimprovement.pd360.dao.community.ForumThreads',
					'method'     : 'save',
					'args'       : {
						'ForumThreadId'  : 0,
						'PersonnelId'    : $.cookie( 'PID' ) || null,
						'Title'          : 'Group Resource: ' + data.file,
						'Sticky'         : 0,
						'Locked'         : 0,
						'Disabled'       : 0,
						'NoPosts'        : 0,
						'ViewCount'      : 0,
						'ReplyCount'     : 0,
						'LocationTypeId' : 5,
						'Rank'           : 0,
						'LocationId'     : this.groupModel.LicenseId,
						'IsTask'         : 0,
						'Created'        : date,
						'Creator'        : $.cookie( 'PID' ) || null,
						'Removed'        : '',
						'Remover'        : 0
					}
				};

				var fetchingData = Remoting.fetch( threadRequest );

				App.when( fetchingData ).done( function ( results ) {
					var postRequest = {
						'path'       : 'com.schoolimprovement.pd360.dao.CommunityService',
						'objectPath' : 'com.schoolimprovement.pd360.dao.community.ForumPosts',
						'method'     : 'forumPostsCreateWithThreadIncrement',
						'args'       : {
							'ForumThreadId'    : results[ 0 ].ForumThreadId,
							'ForumPostId'      : 0,
							'PersonnelId'      : $.cookie( 'PID' ) || null,
							'Subject'          : results[ 0 ].Title,
							'Text'             : data.file,
							'AttachmentFileId' : 0,
							'Rank'             : 0,
							'Created'          : results[ 0 ].Created,
							'Creator'          : $.cookie( 'PID' ) || null,
							'Modified'         : '',
							'Modifier'         : 0,
							'Removed'          : '',
							'Remover'          : 0
						}
					};

					var fetchData = Remoting.fetch( postRequest );
					App.when( fetchData ).done( function ( result ) {
						if ( data.resourceType === 'file' ) {
							this.uploadFileResource( data, result[ 0 ] );
						} else {
							this.uploadLinkResource( data, result[ 0 ] );
						}

					}.bind( this ) ).fail( function ( error ) {
						// TODO: error handling
					} );
				}.bind( this ) ).fail( function ( error ) {
					// TODO: error handling
				} );
			},

			'uploadFileResource' : function ( data, resultPost ) {
				var memberStatus;
				if ( this.userStatus ) {
					memberStatus = 9;
				} else {
					memberStatus = 11;
				}

				var uploadRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
					'method' : 'RespondUploadFileUploadWithThreadAssociation',
					'args'   : {
						'FileId'          : 0,
						'PersonnelId'     : $.cookie( 'PID' ) || null,
						'FileName'        : resultPost.Text,
						'FilePath'        : '',
						'FileTypeId'      : memberStatus,
						'FileDescription' : data.description,
						'LocationTypeId'  : 5,
						'LocationId'      : this.groupModel.LicenseId,
						'Rank'            : 0,
						'ViewCount'       : 0,
						'Disable'         : 0,
						'IsTask'          : 0,
						'Created'         : resultPost.Created,
						'Creator'         : $.cookie( 'PID' ) || null,
						'threadId'        : resultPost.ForumThreadId,
						'postId'          : resultPost.ForumPostId
					}
				};

				var fetchData = Remoting.fetch( uploadRequest );

				App.when( fetchData ).done( function ( results ) {
					this.layout.setURL( results[ 0 ] );
				}.bind( this ) ).fail( function ( error ) {
					// TODO: error handling
				} );
			},

			'uploadLinkResource' : function ( data, resultPost ) {

				var memberStatus;
				if ( this.userStatus ) {
					memberStatus = 6;
				} else {
					memberStatus = 7;
				}

				var uploadRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
					'method' : 'RespondLinkCreateWithThreadAssociation',
					'args'   : {
						'LinkId'          : 0,
						'PersonnelId'     : $.cookie( 'PID' ) || null,
						'LinkURL'         : data.file,
						'LinkTypeId'      : memberStatus,
						'LinkDescription' : data.description,
						'LocationTypeId'  : 5,
						'LocationId'      : this.groupModel.LicenseId,
						'Rank'            : 0,
						'ViewCount'       : 0,
						'Disable'         : 0,
						'IsTask'          : 0,
						'Created'         : resultPost.Created,
						'Creator'         : $.cookie( 'PID' ) || null,
						'threadId'        : resultPost.ForumThreadId,
						'postId'          : resultPost.ForumPostId
					}
				};

				var fetchData = Remoting.fetch( uploadRequest );

				App.when( fetchData ).done( function ( results ) {
					this.createGroupNews( data, resultPost.Created );
				}.bind( this ) ).fail( function ( error ) {
					// TODO: error handling
				} );
			},

			'createGroupNews' : function ( data, date ) {
				var groupNewsRequest = {
					'path'       : 'com.schoolimprovement.pd360.dao.groups.GroupNewsGateway',
					'objectPath' : 'com.schoolimprovement.pd360.dao.groups.GroupNews',
					'method'     : 'create',
					'args'       : {
						'LicenseId' : this.groupModel.LicenseId,
						'NewsEntry' : 'NEW Resource: ' + data.file + ' - ' + data.description,
						'NewsId'    : 0,
						'Created'   : date,
						'Creator'   : $.cookie( 'PID' ) || null
					}
				};

				var fetchNewsData = Remoting.fetch( groupNewsRequest );

				App.when( fetchNewsData ).done( function ( result ) {
					App.navigate( 'groups/' + this.groupModel.LicenseId + '/resources', { 'trigger' : true } );
				}.bind( this ) ).fail( function ( error ) {
					// TODO: error handling
				} );
			}
		};
	} );
} );
