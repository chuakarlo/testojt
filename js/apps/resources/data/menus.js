define( function ( require ) {
	'use strict';

	var videos = {
		'name' : 'Videos',
		'url'  : '#resources/videos',
		'icon' : 'fa-youtube-play',
		'id'   : 'link-more-videos'
	};

	var learningTargets = {
		'name' : 'Learning Targets',
		'url'  : '#resources/learning',
		'icon' : 'fa-bullseye',
		'id'   : 'link-more-targets'
	};

	var communities = {
		'name' : 'Communities',
		'url'  : '#resources/communities',
		'icon' : 'fa-users',
		'id'   : 'link-more-communities'
	};

	var lumibook = {
		'name' : 'LumiBook',
		'url'  : '#resources/lumibook',
		'icon' : 'fa-book',
		'id'   : 'link-more-lumibook'
	};

	var observation = {
		'name' : 'Observation 360',
		'url'  : 'https://www.pd360.com/Observation360Web/index.cfm',
		'icon' : 'fa-eye',
		'id'   : 'link-more-observation'
	};

	var userUploaded = {
		'name' : '{User Video Uploader}',
		'url'  : '#',
		'icon' : 'fa-film',
		'id'   : 'link-more-uploader'
	};

	var moreResources = {
		'name' : 'More Resources',
		'url'  : '#resources/more',
		'icon' : 'fa-align-left',
		'id'   : 'link-resources-more'
	};

	var training = {
		'name' : 'PD 360 Training',
		'url'  : 'http://help.schoolimprovement.com/training',
		'icon' : 'fa-bullhorn',
		'id'   : 'link-more-training'
	};

	var learningProgression = {
		'name' : 'Learning Progression',
		'url'  : '#resources/learningProgression',
		'icon' : 'fa-puzzle-piece',
		'id'   : 'link-more-progression'
	};

	var admin = {
		'name' : 'Admin',
		'icon' : 'fa-wrench',
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
