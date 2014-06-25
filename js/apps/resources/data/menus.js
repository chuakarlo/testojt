define( function ( require ) {
	'use strict';

	var videos = {
		'name' : 'Videos',
		'icon' : 'sinet-videos',
		'url'  : '#resources/videos',
		'id'   : 'link-more-videos'
	};

	var learningTargets = {
		'name' : 'Learning Targets',
		'icon' : 'sinet-learningtarget',
		'url'  : '#resources/learning/processes',
		'id'   : 'link-more-targets'
	};

	var communities = {
		'name' : 'Communities',
		'icon' : 'sinet-groups',
		'url'  : '#resources/communities',
		'id'   : 'link-more-communities'
	};

	var lumibook = {
		'name' : 'LumiBook',
		'icon' : 'sinet-lumibook',
		'url'  : '#resources/lumibook',
		'id'   : 'link-more-lumibook'
	};

	var observation = {
		'name' : 'Observation 360',
		'icon' : 'sinet-observation',
		'url'  : '#resources/observation/me',
		'id'   : 'link-more-observation'
	};

	var userUploaded = {
		'name' : 'User Video Uploader',
		'icon' : 'sinet-uploadvideos',
		'url'  : '#resources/videouploader',
		'id'   : 'link-more-uploader'
	};

	var moreResources = {
		'name' : 'More Resources',
		'icon' : 'sinet-more',
		'url'  : '#resources/more',
		'id'   : 'link-resources-more'
	};

	var training = {
		'name'   : 'Edivation Training',
		'icon'   : 'sinet-training',
		'url'    : 'http://help.schoolimprovement.com/training',
		'id'     : 'link-more-training',
		'target' : '_blank'
	};

	var learningProgression = {
		'name' : 'Learning Progression',
		'icon' : 'sinet-learningprogress',
		'url'  : '#resources/learningProgression',
		'id'   : 'link-more-progression'
	};

	var admin = {
		'name' : 'Admin',
		'icon' : 'sinet-admin',
		'url'  : '#admin',
		'id'   : 'link-more-admin'
	};

	return {
		'admin'               : admin,
		'videos'              : videos,
		'lumibook'            : lumibook,
		'training'            : training,
		'communities'         : communities,
		'observation'         : observation,
		'userUploaded'        : userUploaded,
		'moreResources'       : moreResources,
		'learningTargets'     : learningTargets,
		'learningProgression' : learningProgression,

		'resources' : [
			videos,
			learningTargets,
			communities,
			lumibook,
			learningProgression,
			userUploaded,
			training
		],

		'nav' : [
			videos,
			learningTargets,
			communities,
			lumibook,
			moreResources
		]
	};

} );
