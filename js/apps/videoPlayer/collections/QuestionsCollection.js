define( function ( require ) {
	'use strict';

	require( 'moment-timezone' );
	require( 'timezone' );

	var moment   = require( 'moment' );
	var Backbone = require( 'filterable.collection' );

	var App           = require( 'App' );
	var QuestionModel = require( 'videoPlayer/models/QuestionModel' );

	var config = App.request( 'videoPlayer:config' ).questions;

	return Backbone.Collection.extend( {

		'model' : QuestionModel,

		'initialize' : function () {
			this.listenTo( this, 'reset', this.setTimeDiff );
		},

		'setTimeDiff' : function () {
			this.timeDiff = this.getLatestDiff();
		},

		'showFollowup' : function () {
			return ( this.timeDiff > config.duration );
		},

		// get the latest diff time of submitted reflection questions
		'getLatestDiff' : function () {
			// gets the time difference from submission/creation till 'now'
			function timeDiff ( time ) {
				var now = moment().tz( config.timezone ).format( 'MMMM D, YYYY H:mm:ss' );
				return moment( now ).diff( moment( time ), config.unit );
			}

			var latestDiff = 0;

			// Set initial value
			if ( this.first() ) {
				latestDiff = timeDiff( this.first().get( 'Created' ) );
			}

			// get latest diff for reflection questions date of submission
			this.each( function ( question ) {
				if ( question.get( 'QuestionTypeId' ) === 1 ) {
					var created     = question.get( 'Created' );
					var currentDiff = 0;

					if ( created !== '' ) {
						currentDiff = timeDiff( question.get( 'Created' ) );
					}

					if ( currentDiff < latestDiff ) {
						latestDiff = currentDiff;
					}
				}
			}.bind( this ) );

			return latestDiff;
		}

	} );

} );
