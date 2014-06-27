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

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {
			var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId() ) ] );
			App.when( fetchingModels ).done( function ( models ) {
				App.Homepage.Utils.jsonVal( function ( err ) {
					if ( !err ) {
						options.success( new Collection( models[ 0 ] ) );
						return;
					} else {
						App.vent.trigger( 'flash:message', {
							'message' : 'Courses widget: JSon error'
						} );
					}
				},{
					'schema' : require( 'text!apps/homepage/external/widgets/external/courses/configuration/coursesSchema.json' ),
					'data'   : models[ 0 ]
				} );
			} ).fail( function ( error ) {
				App.vent.trigger( 'flash:message', {
					'message' : App.Homepage.Utils.message.coursesErrMsg
				} );
			} );
		}

	} );

} );
