define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );

	return Backbone.CFModel.extend( {

		'path' : 'RespondService',

		'idAttribute' : 'ContentId',

		'defaults' : {
			'currentTime' : 0
		},

		'getUpdateOptions' : function () {
			// TODO
			// Clarify where to get ViewingId, licId, taskId
			return {
				'method' : 'RespondUpdatedViewingTimeWithStatusCheck',
				'args'   : {
					'PersonnelId'      : Session.personnelId(),
					'ContentId'        : this.id,
					'ViewingId'        : 1,
					'SecondsCompleted' : this.getCurrentTime(),
					'licId'            : 0,
					'taskId'           : 0
				}
			};
		},

		'getCurrentTime' : function () {
			return parseInt( this.get( 'currentTime' ) , 10);
		}

	} );

} );
