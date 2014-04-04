 define ( function ( require ) {
	'use strict';

	var Backbone  = require( 'backbone' );

	var VideoSegmentModel = require( 'videoPlayer/models/VideoSegmentModel' );

	/**
	 * Note:
	 * Using dummy data until API from Respond Team is done.
	 */

	return Backbone.Collection.extend( {

		'model'        : VideoSegmentModel,

		'initialize'   : function() {
			// Dummy data, for testing purposes
			var testData = [ {
				'video'    : 'http://builtbyhq.com/projects/school/CORE/v1/img/vid-5.png',
				'title'    : 'Assessment For Learning',
				'duration' : '1 min'
			},
			{
				'video'     : 'http://builtbyhq.com/projects/school/CORE/v1/img/vid-6.png',
				'title'    : 'Differentiated Instruction...',
				'duration' : '2 min'
			},
			{
				'video'     : 'http://builtbyhq.com/projects/school/CORE/v1/img/vid-6.png',
				'title'    : 'Differentiated Instruction...',
				'duration' : '2 min'
			},
			{
				'video'     : 'http://builtbyhq.com/projects/school/CORE/v1/img/vid-6.png',
				'title'    : 'Differentiated Instruction...',
				'duration' : '2 min'
			},
			{
				'video'     : 'http://builtbyhq.com/projects/school/CORE/v1/img/vid-6.png',
				'title'    : 'Differentiated Instruction...',
				'duration' : '2 min'
			}  ];

			this.set( testData );

			// Should fetch data in production
			// this.fetch();
		}
	} );
} );
