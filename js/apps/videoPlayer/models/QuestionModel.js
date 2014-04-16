define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );

	return Backbone.Model.extend( {

		'idAttribute' : 'QuestionId',

		'initialize'  : function () {},

		'getSanitizedAnswer' : function () {
			function safeString( unsafe ) {
				return String( unsafe )
				.replace( /<\/script/g, '<\\/script' )
				.replace( /<!--/g, '<\\!--' );
			}

			return _.escape( safeString( this.get( 'AnswerText' ) ) );
		}

	} );

} );
