define( function ( require ) {
	'use strict';

	var Backbone     = require( 'backbone' );
	var Remoting     = require( 'Remoting' );
	var ContentModel = require( 'videoPlayer/models/ContentModel' );
	var Session      = require( 'Session' );

	return Backbone.Collection.extend( {

		'url' : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',

		'model' : ContentModel,

		'initialize' : function () {
			// request object for fetching queue contents
			this.fetchRequest = {
				'path'   : this.url,
				'method' : 'getContentAbbrevListByPersonnelId',
				'args'   : {
					'personnelId' : Session.personnelId()
				}
			};

			// request object for adding/removing of content to and from user queue
			this.queueRequest = {
				'path'       : this.url,
				'objectPath' : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmark',
				'args'   : {
					'PersonnelId' : Session.personnelId()
				}
			};
		},

		'contentRequest' : function ( options ) {
			var request;

			options = ( options || {} );

			if ( options.method ) {
				this._prepareRequest( options );
				request = this.queueRequest;
			} else {
				request = this.fetchRequest;
			}

			var fetchingRequest = Remoting.fetch( request );

			if ( options.success ) {
				fetchingRequest.done( options.success );
			}

			if ( options.error ) {
				fetchingRequest.fail( options.error );
			}

			if ( options.always ) {
				fetchingRequest.always( options.always );
			}

			return fetchingRequest;
		},

		'search' : function ( attribute, value ) {
			return this.some( function ( model ) {
				return model.get( attribute ) === value;
			} );
		},

		// reset request object to generate new signature,
		// set the appropriate method and dynamic request arguments
		'_prepareRequest' : function ( options ) {
			var model = options.model || {};

			// set request method and clear signature
			this.queueRequest.method    = options.method;
			this.queueRequest.signature = '';

			// set dynamic request arguments
			this.queueRequest.args.ContentId = model.id;
			this.queueRequest.args.Created   = model.get( 'Created' );
		}

	} );

} );
