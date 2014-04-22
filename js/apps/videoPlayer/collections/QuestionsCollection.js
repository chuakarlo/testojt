define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );

	var QuestionModel = require( 'videoPlayer/models/QuestionModel' );

	return Backbone.Collection.extend( {
		// Numbers corresponds to video ContentType
		// 3 : core
		// 6 : commoncore
		'path' : {
			'3' : 'com.schoolimprovement.pd360.dao.core.QuestionAnswersGateway',
			'6' : 'com.schoolimprovement.pd360.dao.commoncore.CCQuestionAnswersGateway'
		},

		'objectPath' : {
			'3' : 'com.schoolimprovement.pd360.dao.core.QuestionAnswers',
			'6' : 'com.schoolimprovement.pd360.dao.commoncore.CCQuestionAnswers'
		},

		'method' : 'getQuestionsWithAnswers',

		'model' : QuestionModel,

		'buildRequests' : function () {

			return this.map( function ( question ) {
				var request = {
					'path'       : this.path[ question.get( 'ContentTypeId' ) ],
					'objectPath' : this.objectPath[ question.get( 'ContentTypeId' ) ],
					'method'     : 'create',
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
			options = options || { };

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
