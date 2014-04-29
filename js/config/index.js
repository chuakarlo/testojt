define( function ( require, exports, module ) {
	'use strict';

	module.exports = {
		'base'      : 'com.schoolimprovement.pd360.dao.',
		'url'       : '/com/schoolimprovement/pd360/dao/CfJsonAPIService.cfc?method=cfJsonAPI',
		'objectUrl' : '/com/schoolimprovement/pd360/dao/CfJsonAPIService.cfc?method=cfJsonObjectAPI',
		'method'    : 'cfJsonAPIMethod1',
		// Settings for switching reflections to followup questions.
		'questions' : {
			'duration' : 72,
			'timezone' : 'MST7MDT',
			'unit'     : 'hours'
		}
	};

} );
