define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );

	function recommendedRequest ( personnelid, start ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
			'method' : 'RespondSearchRecommendedContent',
			'args'   : {
				'personnelid' : personnelid,
				'start'       : start,
				'rows'        : 24,
				'sort'        : 'created desc'
			}
		};
	}

	function queueRequest ( personnelid ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
			'method' : 'getContentAbbrevListByPersonnelId',
			'args'   : {
				'personnelId' : personnelid
			}
		};
	}

	var fetchingModels = function ( start ) {
		var personnelid = Session.personnelId();

		var apiCall = [ recommendedRequest( personnelid, start ) ];

		if ( !App.reqres.hasHandler( 'homepage:content:queue:fetch' ) ) {
			apiCall.push( queueRequest( personnelid ) );
		}

		return Remoting.fetch( apiCall );
	};

	function removeDuplicate ( models ) {

		var cypher = [ ];
		return $.grep ( models, function ( x, i ) {
			if ( i === 0 ) {
				return true;
			}
			var n   = models[ i ];
			var id  = !n.ContentId ? n.UUVideoId : n.ContentId;
			var hit = !_.contains( cypher, id );
			if ( hit ) {
				cypher.push( id );
			}
			return hit ;
		} );
	}

	return Backbone.Collection.extend( {

		'initialize' : function ( options ) {
			this.start           = 0;
			this.queueCollection = [ ];
		},

		'fetch' : function ( options ) {
			App.when( fetchingModels( this.start ) ).done( function ( models ) {
				models[ 0 ] =  removeDuplicate( models[ 0 ] );

				var hasFetchedQueue = App.reqres.hasHandler( 'homepage:content:queue:fetch' );

				var innerModel = new Backbone.Collection( models[ 0 ] );

				if ( hasFetchedQueue ) {
					innerModel.queueCollection = App.request( 'homepage:content:queue:fetch' );
				} else {
					innerModel.queueCollection = models[ 1 ];
					App.reqres.setHandler( 'homepage:content:queue:fetch', function () {
						return models[ 1 ];
					} );
				}
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
	} );
} );
