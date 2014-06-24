define ( function (require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );

	function widgetRequest ( personnelId ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
			'method' : 'RespondGetFocusObjectiveContent',
			'args'   : {
				'personnelId' : personnelId
			}
		};
	}

	var schema = {
		'title'      : 'focus objective schema v1',
		'type'       : 'object',
		'required'   : [
			'ContentName',
			'SegmentLengthInSeconds',
			'Children',
			'ContentId',
			'ImageURL',
			'TranscriptFileName',
			'GuidebookFileName',
			'ContentTypeId',
			'AudioFileName',
			'ContentDescription'
		],
		'properties' : {
			'ContentName'            : {
				'type' : 'string'
			},
			'SegmentLengthInSeconds' : {
				'type' : 'number'
			},
			'Children'               : {
				'type' : 'array'
			},
			'ContentId'              : {
				'type' : 'number'
			},
			'ImageURL'               : {
				'type' : 'string'
			},
			'TranscriptFileName'     : {
				'type' : 'string'
			},
			'GuidebookFileName'      : {
				'type' : 'string'
			},
			'ContentTypeId'          : {
				'type' : 'number'
			},
			'AudioFileName'          : {
				'type' : 'string'
			},
			'ContentDescription'     : {
				'type' : 'string'
			}
		}
	};

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {

			var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId() ) ] );

			App.when( fetchingModels ).done( function ( models ) {

				App.Homepage.Utils.jsonVal( schema, models[ 0 ], function ( err ) {
					if ( !err ) {
						options.success( new Backbone.Collection( models[ 0 ] ) );
					} else {
						options.error( err );
					}
				} );

			} ).fail( function ( error ) {

				App.vent.trigger( 'flash:message', {
					'message' : App.Homepage.Utils.message.focusObjectiveErrMsg
				} );

			} );
		}

	} );

} );
