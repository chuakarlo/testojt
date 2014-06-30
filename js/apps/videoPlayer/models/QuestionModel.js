define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );

	return Backbone.CFModel.extend( {

		'idAttribute' : 'QuestionId',

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );
		},

		'isNew' : function () {
			return this.get( 'Created' ) === '';
		},

		'requestObject' : function () {
			var paths = {
				'3' : 'core.QuestionAnswersGateway',
				'6' : 'commoncore.CCQuestionAnswersGateway'
			};
			var objectPaths = {
				'3' : 'core.QuestionAnswers',
				'6' : 'commoncore.CCQuestionAnswers'
			};

			this.path = paths[ this.get( 'ContentTypeId' ) ];

			return {
				'objectPath' : objectPaths[ this.get( 'ContentTypeId' ) ],
				'args'       : {
					'PersonnelId' : Session.personnelId(),
					'QuestionId'  : this.id,
					'AnswerText'  : this.getSanitizedAnswer(),
					'Created'     : this.get( 'Created' ),
					'Modified'    : ''
				}
			};
		},

		'getCreateOptions' : function () {
			return _.extend( this.requestObject(), { 'method' : 'create' } );
		},

		'getUpdateOptions' : function () {
			return _.extend( this.requestObject(), { 'method' : 'update' } );
		},

		'getSanitizedAnswer' : function ( answer ) {
			var answerText = answer || this.get( 'AnswerText' );

			function safeString ( unsafe ) {
				return String( unsafe )
					.replace( /<\/script/g, '<\\/script' )
					.replace( /<!--/g, '<\\!--' );
			}

			// Replacing \n to another string pattern to prevent server authorization error
			return _.escape( safeString( answerText ).replace( /\n/g, '%nl%' ) );
		}

	} );

} );
