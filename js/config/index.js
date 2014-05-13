define( function ( require, exports, module ) {
	'use strict';

	module.exports = {
		'base'      : 'com.schoolimprovement.pd360.dao.',
		'url'       : '/com/schoolimprovement/pd360/dao/CfJsonAPIService.cfc?method=cfJsonAPI',
		'objectUrl' : '/com/schoolimprovement/pd360/dao/CfJsonAPIService.cfc?method=cfJsonObjectAPI',
		'method'    : 'cfJsonAPIMethod1',
		// Settings for switching reflections to followup questions.
		'questions' : {
			'message'  : 'Follow-up questions are available 72 hours after completion of reflection questions.',
			'duration' : 72,
			'timezone' : 'MST7MDT',
			'unit'     : 'hours'
		}
	};

} );
