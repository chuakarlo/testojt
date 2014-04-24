define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var Remoting = require( 'Remoting' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );
	var Session  = require( 'Session' );

	function recommendedRequest( start ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.SearchService',
			'method' : 'RespondSearchAPI',
			'args'   : {
				'persId'     : Session.personnelId(),
				'searchType' : 'VideosCore',
				'start'      : start,
				'rows'       : 24,
				'searchData' : App.request( 'homepage:userTags' ),
				'sort'       : 'created desc'
			}
		};
	}

	var queueRequest =  {
		'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
		'method' : 'getContentAbbrevListByPersonnelId',
		'args'   : {
			'personnelId' : Session.personnelId()
		}
	};

	function fetchingModels ( start ) {
		return Remoting.fetch( [ recommendedRequest( start ), queueRequest ] );
	}

	return Backbone.Collection.extend({
		'initialize': function(options) {
			this.start           = 0;
			this.queueCollection = [ ];
		},
		'fetch' : function ( options ) {
			$.when( fetchingModels( this.start ) ).done( function ( models ) {

				var innerModel = new Backbone.Collection( models[ 0 ] );
				innerModel.queueCollection = models[ 1 ];
				options.success( innerModel );

			} ).fail( function ( ) {
				// TODO: error handling
			} );
		},
		'alterData': function(start) {
			this.start = start;
		}
	});
});