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

	var ValidationSchema = {
		'title'      : 'Courses Validation Schema',
		'type'       : 'object',
		'required'   : [ 'PERCENTCOMPLETE', 'COURSEID', 'COURSECREATOR', 'COURSENAME', 'EXPIREDATE' ],
		'properties' : {
			'PERCENTCOMPLETE' : {
				'type' : 'number'
			},
			'COURSEID'        : {
				'type' : 'number'
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

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {
			var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId() ) ] );
			App.when( fetchingModels ).done( function ( models ) {
				App.Homepage.Utils.jsonVal( ValidationSchema, models[0], function ( err ) {
					if ( !err ) {
						options.success( new Collection( models[0] ) );
						return;
					}
					App.vent.trigger( 'flash:message', {
						'message' : 'Courses widget: JSon error'
					} );
				} );
			} ).fail( function ( error ) {
				App.vent.trigger( 'flash:message', {
					'message' : App.Homepage.Utils.message.coursesErrMsg
				} );
			} );
		}

	} );

} );
