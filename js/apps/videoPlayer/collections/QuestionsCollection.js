define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );

	var QuestionModel = require( 'videoPlayer/models/QuestionModel' );

	return Backbone.Collection.extend( {

		'url' : {
			'fetch' : 'com.schoolimprovement.pd360.dao.ContentService',
			'save'  : 'com.schoolimprovement.pd360.dao.core.QuestionAnswersGateway'
		},

		'objectPath' : 'com.schoolimprovement.pd360.dao.core.QuestionAnswers',

		'method'     : 'getQuestionsWithAnswers',

		'model'      : QuestionModel,

		'initialize' : function () {},

		'buildRequests' : function () {
			return this.map( function ( question ) {
				var request = {
					'path'       : this.url.save,
					'objectPath' : this.objectPath,
					'method'     : 'update',
					'args'       : {
						'PersonnelId' : Session.personnelId(),
						'QuestionId'  : question.get( 'QuestionId' ),
						'AnswerText'  : question.getSanitizedAnswer(),
						'Created'     : '',
						'Modified'    : ''
					}
				};
				return request;
			}.bind( this ) );
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
