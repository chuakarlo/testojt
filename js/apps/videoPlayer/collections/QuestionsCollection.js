define( function ( require ) {
	'use strict';

	require( 'moment-timezone' );
	require( 'timezone' );

	var moment   = require( 'moment' );
	var _        = require( 'underscore' );
	var Backbone = require( 'filterable.collection' );

	var QuestionModel = require( 'videoPlayer/models/QuestionModel' );
	var config        = require( 'config' ).questions;

	return Backbone.Collection.extend( {

		'model' : QuestionModel,

		'initialize' : function ( options ) {
			config = _.extend( config, options );
			this.timeDiff = this.getLargestDiff();
		},

		'showFollowup' : function () {
			if ( this.timeDiff > config.durations ) {
				return true;
			}
		},

		'getTimeDiff' : function ( time ) {
			var now = moment().tz( config.timezone ).format( 'MMMM D, YYYY H:mm:ss' );
			return moment( now ).diff( moment( time ), config.unit );
		},

		// get the largest diff time of submitted reflection questions
		'getLargestDiff' : function () {
			var largestDiff = 0;

			this.each( function ( question ) {
				if ( question.get( 'QuestionTypeId' ) === 1 &&
					question.get( 'Created' ) !== '' ) {
					var temp = this.getTimeDiff( question.get( 'Created' ) );
					if ( temp > largestDiff ) {
						largestDiff = temp;
					}
				}
			}.bind( this ) );

			return largestDiff;
		}

	} );

} );
