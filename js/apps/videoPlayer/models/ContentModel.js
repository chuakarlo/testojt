define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );

	return Backbone.Model.extend( {

		'url' : 'com.schoolimprovement.pd360.dao.RespondService',

		'idAttribute' : 'ContentId',

		'initialize' : function () {},

		'updateProgress' : function ( secondsCompleted ) {
			var request = {
				'path' : this.url,
				'method' : 'RespondUpdatedViewingTimeWithStatusCheck',
				'args' : {
					'PersonnelId'      : Session.personnelId(),
					'ContentId'        : this.id,
					'ViewingId'        : 1,
					'SecondsCompleted' : parseInt( secondsCompleted , 10),
					'licId'            : 0, // where to get licenses?
					'taskId'           : 0
				}
			};

			return Remoting.fetch( request );
		}
	} );
} );
