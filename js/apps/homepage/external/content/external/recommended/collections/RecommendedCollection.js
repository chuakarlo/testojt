define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );

	var recommendedSchema = function () {
		return {
			'header'  : function () {
				return {
					'title'      : 'Header Recommended Schema',
					'type'       : 'object',
					'required'   : [
						'maxScore',
						'name',
						'numFound',
						'start'
					],
					'properties' : {
						'maxScore' : {
							'type' : 'number'
						},
						'name'     : {
							'type' : 'string'
						},
						'numFound' : {
							'type' : 'number'
						},
						'start'    : {
							'type' : 'number'
						}
					}
				};
			},
			'content' : function () {
				return {
					'title'      : 'Recommended Schema',
					'type'       : 'object',
					'required'   : [
						'AudioFileName',
						'ContentDescription',
						'ContentId',
						'ContentName',
						'ContentTypeId',
						'Created',
						'FileName',
						'GuidebookFileName',
						'ImageURL',
						'Modified',
						'PreviewVideoName',
						'SearchData',
						'SegmentLengthInSeconds'
					],
					'properties' : {
						'AudioFileName'          : {
							'type' : 'string'
						},
						'ContentDescription'     : {
							'type' : 'string'
						},
						'ContentId'              : {
							'type' : 'number'
						},
						'ContentName'            : {
							'type' : 'string'
						},
						'ContentTypeId'          : {
							'type' : 'number'
						},
						'Created'                : {
							'type' : 'string'
						},
						'FileName'               : {
							'type' : 'string'
						},
						'GuidebookFileName'      : {
							'type' : 'string'
						},
						'ImageURL'               : {
							'type' : 'string'
						},
						'Modified'               : {
							'type' : 'string'
						},
						'PreviewVideoName'       : {
							'type' : 'string'
						},
						'SearchData'             : {
							'type' : 'string'
						},
						'SegmentLengthInSeconds' : {
							'type' : 'number'
						}
					}
				};
			}
		};
	};
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

	var fetchingModels = function ( start ) {

		var queueRequest =  {
			'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
			'method' : 'getContentAbbrevListByPersonnelId',
			'args'   : {
				'personnelId' : Session.personnelId()
			}
		};

		return Remoting.fetch( [ recommendedRequest( start ), queueRequest ] );
	};

	var checkRecommended = function ( models, options, innerModel ) {
		App.Homepage.Utils.jsonVal( recommendedSchema().content(), models [ 0 ], function ( err ) {
			if ( !err ) {
				options.success( innerModel );
			}else {
				options.error( err );
			}
		} );
	};

	return Backbone.Collection.extend({

		'initialize' : function ( options ) {
			this.start           = 0;
			this.queueCollection = [ ];
		},

		'fetch' : function ( options ) {
			App.when( fetchingModels( this.start ) ).done( function ( models ) {
				if ( !(models[ 0 ].length === 1 && typeof models[ 0 ][ 0 ] === 'string') ) {

					var innerModel = new Backbone.Collection( models[ 0 ] );
					innerModel.queueCollection = models[ 1 ];
					var temp = models[ 0 ].splice( 0, 1 );

					App.Homepage.Utils.jsonVal( recommendedSchema().header(), temp, function ( err ) {
						if ( err ) {
							options.error( err );
						}else {
							checkRecommended( models, options, innerModel );
						}
					} );

				}else {
					options.error( 'No Results Found' );
				}

			} ).fail( function ( error ) {

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
