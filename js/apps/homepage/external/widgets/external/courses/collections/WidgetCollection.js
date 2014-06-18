define ( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );

	function widgetRequest ( personnelId ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.CourseService',
			'method' : 'getUsersCourseCompletionPercentageForLearningTargets',
			'args'   : {
				'personnelId' : personnelId
			}
		};
	}

	var Collection = Backbone.Collection.extend( {
		'comparator' : function ( model ) {
			return App.Homepage.Utils.compareDate( model, 'STARTDATE' );
		}
	} );

	var schema = {
		'title'      : 'fresh fruit schema v1',
		'type'       : 'array',
		'required'   : [ 'PERCENTCOMPLETE', 'COURSEID', 'COURSECREATOR', 'COURSENAME', 'EXPIREDATE' ],
		'properties' : {
			'PERCENTCOMPLETE' : {
				'type' : 'string'
			},
			'COURSEID'        : {
				'type' : 'string'
			},
			'COURSECREATOR'   : {
				'type' : 'string'
			},
			'COURSENAME'      : {
				'type' : 'string'
			},
			'EXPIREDATE'      : {
				'type' : 'string'
			}
		}
	};
	//temporary assignment due to jslint error
	schema = { };

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {
			var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId() ) ] );
			App.when( fetchingModels ).done( function ( models ) {
				options.success( new Collection( models[ 0 ] ) );
			} ).fail( function ( error ) {
				App.vent.trigger( 'flash:message', {
					'message' : App.Homepage.Utils.message.coursesErrMsg
				} );
			} );
		}

	} );

} );
