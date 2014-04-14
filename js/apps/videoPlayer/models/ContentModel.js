define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );

	return Backbone.Model.extend( {

		'url' : {
			'ContentService' : 'com.schoolimprovement.pd360.dao.ContentService',
			'RespondService' : 'com.schoolimprovement.pd360.dao.RespondService'
		},

		'idAttribute' : 'ContentId',

		'initialize' : function () {},

		'fetch' : function ( request ) {
			request.path = this.url.ContentService;
			return Remoting.fetch( request );
		},

		'update' : function ( request ) {
			request.path = this.url.RespondService;
			return Remoting.fetch( request );
		},

		'updateProgress' : function ( secondsCompleted ) {
			var request = {
				'method' : 'RespondUpdatedViewingTimeWithStatusCheck',
				'args' : {
					'PersonnelId' : Session.personnelId(),
					'ContentId' : this.id,
					'ViewingId' : 1,
					'SecondsCompleted' : parseInt( secondsCompleted , 10),
					'licId' : 0, // where to get licenses?
					'taskId' : 0
				}
			};

			return this.update( request );
		}
	} );
} );
