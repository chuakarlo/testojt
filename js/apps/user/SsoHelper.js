define( function ( require ) {
	'use strict';

	var _ = require( 'underscore' );

	var linkFromParams = function ( options ) {

		var link;

		// transform all keys to UPPERCASE
		var params = { };
		_.each( options, function changeToUpperCase ( value, key ) {
			params[ key.toUpperCase() ] = value;
		} );

		//--------------------------
		// content id
		//--------------------------
		if ( params.CONTENTID ) {
			return 'resources/videos/' + params.CONTENTID;
		}

		//--------------------------
		// joinGroup
		//--------------------------
		if ( params.JOINGROUP ) {
			return 'groups/' + params.JOINGROUP;
		}

		//--------------------------
		// communities
		//--------------------------
		if ( params.LOCTYPE && params.LOC ) {

			// LocationTypeId and LocationId
			link = 'resources/communities/' + params.LOCTYPE + '/' + params.LOC;

			// ForumThreadId
			if ( params.THREAD ) {
				link += '/' + params.THREAD;

				// ForumPostId
				if ( params.POST ) {
					link += '/' + params.POST;

					// TaskId
					if ( params.TASK ) {
						link += '/task/' + params.TASK;
					}
				}
			}

			return link;
		}

		//--------------------------
		// Lumibook
		//--------------------------
		if ( params.LB_ID ) {

			// lumibook id
			link = 'resources/lumibook/' + params.LB_ID;

			// item id
			if ( params.LB_IID ) {
				link += '/' + params.LB_IID;
			}

			return link;
		}

		//--------------------------
		// User Uploaded Videos
		//--------------------------
		if ( params.UUVIDEOID ) {
			return 'resources/videos/' + params.UUVIDEOID + '?uuv=true';
		}

		//--------------------------
		// Observations of me
		// It appears the original system doesn't pass an id of a specific observation to go to.
		//--------------------------
		if ( params.SHOWPERFOCUST || params.SHOWPERFOCUSA ) {
			var observationId = params.SHOWPERFOCUST || params.SHOWPERFOCUSA;

			return 'resources/learning/observations/' + observationId;
		}

		//--------------------------
		// Processes of me
		//--------------------------
		if ( params.PROCESSID ) {
			return 'resources/learning/processes/' + params.PROCESSID;
		}

		//--------------------------
		// Courses
		//--------------------------
		if ( params.COURSEID || params.SHOWCOURSE ) {
			var courseId = params.COURSEID || params.SHOWCOURSE;

			return 'resources/learning/courses/' + courseId;
		}

		return;

	};

	var isSSO = function ( params ) {
		return params.md5 || params.md5pswd || params.groupId || params.group;
	};

	return {
		'linkFromParams' : linkFromParams,
		'isSSO'          : isSSO
	};

} );
