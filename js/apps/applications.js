define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	var admin               = require( 'admin/Admin' );
	var communities         = require( 'communities/Communities' );
	var contentNavigation   = require( 'contentNavigation/ContentNavigation' );
	var groups              = require( 'groups/Groups' );
	var observation         = require( 'observation/Observation' );
	var homepage            = require( 'homepage/Homepage' );
	var learningProgression = require( 'learningProgression/LearningProgression' );
	var learningTargets     = require( 'apps/learningTargets/LearningTargets' );
	var lumiBook            = require( 'lumibook/LumiBook' );
	var resources           = require( 'resources/Resources' );
	var search              = require( 'search/Search' );
	var videoPlayer         = require( 'videoPlayer/VideoPlayer' );
	var videoUploader       = require( 'videoUploader/VideoUploader' );
	var share               = require( 'share/Share' );
	var messages            = require( 'apps/messages/Messages' );

	App.vent.on( 'session:deferredResources', function () {

		// Load all of the deferred resources
		admin();
		communities();
		contentNavigation();
		groups();
		observation();
		homepage();
		learningProgression();
		learningTargets();
		lumiBook();
		resources();
		search();
		videoPlayer();
		videoUploader();
		share();
		messages();

		// Set initialized status
		App.request( 'session:setInitialized' );

	} );

} );
