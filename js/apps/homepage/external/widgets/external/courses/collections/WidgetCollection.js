define ( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );

	var WidgetModel = require( 'apps/homepage/external/widgets/external/courses/models/WidgetModel' );

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

		'model' : WidgetModel,

		'comparator' : function ( model ) {
			var date = new Date( model.get( 'STARTDATE' ) ).getTime();
			return -date;
		}

	} );

	return Backbone.Collection.extend( {

		'fetch' : function ( options ) {
			var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId() ) ] );

			App.when( fetchingModels ).done( function ( models ) {

				options.success( new Collection( models[ 0 ] ) );

			} ).fail( function ( error ) {
				// TODO: error handling
			} );
		}

	} );

} );
