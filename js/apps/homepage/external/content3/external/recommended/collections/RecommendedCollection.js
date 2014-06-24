define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );

	var fetchingModels = function ( start ) {

		var recommendedRequest = function ( start ) {
			return {
				'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
				'method' : 'RespondSearchRecommendedContent',
				'args'   : {
					'personnelid' : Session.personnelId(),
					'start'       : start,
					'rows'        : 24,
					'sort'        : 'created desc'
				}
			};
		};

		var queueRequest =  {
			'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
			'method' : 'getContentAbbrevListByPersonnelId',
			'args'   : {
				'personnelId' : Session.personnelId()
			}
		};

		return Remoting.fetch( [ recommendedRequest( start ), queueRequest ] );
	};

	return Backbone.Collection.extend({

		'initialize' : function ( options ) {
			this.start           = 0;
			this.queueCollection = [ ];
		},

		'fetch' : function ( options ) {
			App.when( fetchingModels( this.start ) ).done( function ( models ) {

				var innerModel = new Backbone.Collection( models[ 0 ] );
				innerModel.queueCollection = models[ 1 ];
				options.success( innerModel );

			} ).fail( function ( ) {

				App.vent.trigger( 'flash:message', {
					'message' : 'An error occurred getting recommended videos. Please try again later.'
				} );

			} );
		},

		'alterData' : function ( start ) {
			this.start = start;
		}
	});
});
