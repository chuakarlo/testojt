define( function ( require ) {
	'use strict';

	var _                       = require( 'underscore' );
	var Backbone                = require( 'backbone' );

	var ReflectionQuestionModel = require( 'videoPlayer/models/QuestionModel' );
	var Remoting                = require( 'Remoting' );
	var Session                 = require( 'Session' );

	return Backbone.Collection.extend( {

		'url' : {
			'fetch' : 'com.schoolimprovement.pd360.dao.ContentService',
			'save'  : 'com.schoolimprovement.pd360.dao.core.QuestionAnswersGateway'
		},

		'objectPath' : 'com.schoolimprovement.pd360.dao.core.QuestionAnswers',

		'method'     : 'getQuestionsWithAnswers',

		'model'      : ReflectionQuestionModel,

		'initialize' : function () {},

		'fetch' : function ( request, options ) {
			options = options || {};

			request.path   = this.url.fetch;
			request.method = this.method;

			var fetchingRequest = Remoting.fetch( request );

			if ( options.success ) {
				fetchingRequest.then( options.success );
			}

			if ( options.error ) {
				fetchingRequest.fail( options.error );
			}

			if ( options.reset ) {
				fetchingRequest.done( _.bind( this.resetCollection, this ) );
			}

			return fetchingRequest;
		},

		'resetCollection' : function ( response ) {
			this.reset( _.first( response ) );
		},

		'buildRequests' : function () {
			var self = this;

			return this.map( function ( question ) {
				var request = {
					'path'       : self.url.save,
					'objectPath' : self.objectPath,
					'method'     : 'update',
					'args'       : {
						'PersonnelId' : Session.personnelId(),
						'QuestionId'  : question.get( 'QuestionId' ),
						'AnswerText'  : question.get( 'AnswerText' ),
						'Created'     : '',
						'Modified'    : 'now'
					}
				};
				return request;
			} );
		},

		'sync' : function ( options ) {
			options = options || {};

			var requests    = this.buildRequests();
			var saveRequest = Remoting.fetch( requests );

			if ( options.success ) {
				saveRequest.then( options.success );
			}

			if ( options.error ) {
				saveRequest.fail( options.error );
			}

			return saveRequest;
		}
	} );
} );
