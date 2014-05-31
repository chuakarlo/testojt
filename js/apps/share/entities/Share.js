define( function ( require ) {
	'use strict';

	var Session  = require( 'Session' );
	var Backbone = require( 'backbone' );

	return Backbone.CFModel.extend( {

		'path' : 'RespondService',

		'initialize' : function ( options ) {
			this.message      = options.message;
			this.licenseIds   = options.licenseIds;
			this.personnelIds = options.personnelIds;
		},

		'getCreateOptions' : function () {
			return {
				'method' : 'RespondSendMessage',
				'args'   : {
					'creator'      : Session.personnelId(),
					'message'      : this.message,
					'personnelIds' : this.personnelIds,
					'licenseIds'   : this.licenseIds
				}
			};
		}

	} );

} );
