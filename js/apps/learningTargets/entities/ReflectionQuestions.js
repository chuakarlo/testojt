define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.ReflectionQuestions = Backbone.CFCollection.extend( {

			'path' : 'ContentService',

			'getReadOptions' : function () {
				return {
					'method' : 'getSegmentsWithIncompleteQuestions',
					'args'   : {
						'persId' : Session.personnelId()
					}
				};
			}

		} );

	} );

	var API = {

		getSegmentsWithIncompleteQuestions : function () {
			var defer = $.Deferred();

			var reflectionQuestions = new App.Entities.ReflectionQuestions();

			reflectionQuestions.fetch( {

				'success' : function () {
					defer.resolve( reflectionQuestions );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching reflectionQuestions' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'lt:reflection-questions', function () {
		return API.getSegmentsWithIncompleteQuestions();
	} );

} );
