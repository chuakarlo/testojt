define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Remoting   = require( 'Remoting' );
	var Session    = require( 'Session' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var template   = require( 'text!../templates/groupResourceItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),
		'tagName'  : 'li',
		'events'   : {
			'click .resource-download' : 'downloadResource'
		},

		'templateHelpers' : {

			'getFileNameOrURL' : function () {
				return ( this.FileName ) ? this.FileName : this.LinkURL;
			},

			'getResourceDescription' : function () {
				// remove html tags and return description
				return ( this.FileDescription ) ? this.FileDescription.replace( /(<([^>]+)>)/ig, '' ) : this.LinkDescription.replace( /(<([^>]+)>)/ig, '' );
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

				// generate timestamp
				var getTimeStampRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.AdminService',
					'method' : 'akamaiTokenizer',
					'args'   : {
						'url' : url
					}
				};

				var requests = [ getTimeStampRequest ];
				var getData  = Remoting.fetch( requests );

				$.when( getData ).done( function ( result ) {

				}.bind( this ) ).fail( function ( error ) {

				}.bind( this ) );

			}.bind( this ) ).fail( function ( error ) {
				// TODO: error handling
			}.bind( this ) );

		}
	} );

} );
