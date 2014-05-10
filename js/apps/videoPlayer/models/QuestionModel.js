define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );

	return Backbone.CFModel.extend( {

		'idAttribute' : 'QuestionId',

		'initialize' : function () {
			var paths = {
				'3' : 'core.QuestionAnswersGateway',
				'6' : 'commoncore.CCQuestionAnswersGateway'
			};
			var objectPaths = {
				'3' : 'core.QuestionAnswers',
				'6' : 'commoncore.CCQuestionAnswers'
			};
			this.path = paths[ this.get( 'ContentTypeId' ) ];
			this.objectPath = objectPaths[ this.get( 'ContentTypeId' ) ];
		},

		'isNew' : function () {
			return this.get( 'Created' ) === '';
		},

		'requestObject' : function () {
			return {
				'args' : {
					'PersonnelId' : Session.personnelId(),
					'QuestionId'  : this.id,
					'AnswerText'  : this.getSanitizedAnswer(),
					'Created'     : '',
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

		'getSanitizedAnswer' : function () {
			function safeString ( unsafe ) {
				return String( unsafe )
				.replace( /<\/script/g, '<\\/script' )
				.replace( /<!--/g, '<\\!--' );
			}

			return _.escape( safeString( this.get( 'AnswerText' ) ) );
		}

	} );

} );
