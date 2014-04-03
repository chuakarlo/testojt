define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Courses = Backbone.CFCollection.extend( {

			'path' : 'CourseService',

			'idAttribute' : 'personnelId',

			'getReadOptions' : function () {
				return {
					'method' : 'getUsersCourseCompletionPercentageForLearningTargets',
					'args' : {
						'personnelId' : Session.personnelId()
					}
				};
			}

		} );

	} );

	var API = {

		'getCourses' : function () {
			var defer = $.Deferred();

			var courses = new App.Entities.Courses();

			courses.fetch( {

				'success' : function () {
					defer.resolve( courses );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching courses' ) );
				},

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'lt:courses', function () {
		return API.getCourses();
	} );

} );
