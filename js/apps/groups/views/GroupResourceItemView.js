define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Remoting   = require( 'Remoting' );
	var Session    = require( 'Session' );
	var $          = require( 'jquery' );
	var App        = require( 'App' );
	var _          = require( 'underscore' );
	var stripHtml  = require( 'common/helpers/stripHtml' );

	var template   = require( 'text!../templates/groupResourceItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),
		'tagName'  : 'li',
		'ui'       : {
			'resourceDownload' : '.resource-download'
		},
		'events'   : {
			'click @ui.resourceDownload' : 'downloadResource'
		},

		'templateHelpers' : {

			'getFileNameOrURL' : function () {
				return ( this.FileName ) ? this.FileName : this.LinkURL;
			},

			'getResourceDescription' : function () {
				// remove html tags and return description
				return ( this.FileDescription ) ? stripHtml ( this.FileDescription ) : stripHtml ( this.LinkDescription );
			},

			'getDownloadButtonStatus' : function () {
				return ( this.FileName ) ? '' : 'hidden';
			},

			'checkIfLink' : function () {
				return ( this.LinkURL ) ? '' : 'hidden';
			},

			'checkIfFile' : function () {
				return ( this.FileName ) ? '' : 'hidden';
			}
		},

		'downloadResource' : function () {

			// Update view count of the resource
			var updateViewCountRequest = {
				'path'   : 'com.schoolimprovement.pd360.dao.CommunityService',
				'method' : 'setRecentViewings',
				'args'   : {
					'TargetTypeId' : 3,
					'TargetId'     : this.model.attributes.FileId,
					'PersonnelId'  : $.cookie( 'PID' ) || null
				}
			};

			var getConfigDataRequest = {
				'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
				'method' : 'RespondGetConfigVariables',
				'args'   : {
					'persId' : Session.personnelId()
				}
			};

			var requests     = [ updateViewCountRequest, getConfigDataRequest ];
			var fetchingData = Remoting.fetch( requests );

			$.when( fetchingData ).done( function ( results ) {

				// set results to vars
				var configData = results[ 1 ].DATA;

				// set URL
				var fileName = this.model.attributes.FileName;
				var ext      = fileName.substr( fileName.lastIndexOf( '.' ), fileName.length );
				var url      = configData.fileStoragePathTrunc + 'file_' + this.model.attributes.FileId + '_' + $.cookie( 'PID' ) + ext;
				var time     = ( new Date() ).getTime();

				// generate timestamp
				var getTimeStampRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.AdminService',
					'method' : 'akamaiTokenizer',
					'args'   : {
						'url'    : url,
						'param'  : configData.akamaiParam,
						'window' : configData.akamaiTTL,
						'salt'   : '791kirk8686',
						'time'   : time
					}
				};

				var requests = [ getTimeStampRequest ];
				var getData  = Remoting.fetch( requests );

				$.when( getData ).done( function ( results ) {

					var hashedUrl = results[ 0 ];

					// POST request for file download
					// TODO: modify code below for the downloading of resource
					// use configData.FileURL instead of hardcoded postURL
					var postURL = 'http://cebudev.pd360.com/FileServer.cfm';

					var _post = function ( path, params, method ) {
						method = method || 'post';

						var form = document.createElement( 'form' );
						form.setAttribute( 'method', method );
						form.setAttribute( 'action', path );

						for ( var key in params ) {
							if ( params.hasOwnProperty( key ) ) {
								var hiddenField = document.createElement( 'input' );
								hiddenField.setAttribute( 'type', 'hidden' );
								hiddenField.setAttribute( 'name', key );
								hiddenField.setAttribute( 'value', params[ key ] );

								form.appendChild( hiddenField );
							}
						}

						document.body.appendChild( form );
						form.submit();
					};

					_post( postURL, { 'FilePath' : hashedUrl, 'OriginalFileName' : fileName } );

				}.bind( this ) ).fail( App.errorHandler );

			}.bind( this ) ).fail( App.errorHandler );

		}
	} );

} );
