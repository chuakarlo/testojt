define( function (require) {
	'use strict';

	return function(options) {

		var parent = [];
		var sharedData = options;

		//Register your external widgets here
		require('apps/homepage/external/what-to-do-next/external/learning-targets/base').register(parent, sharedData);
		require('apps/homepage/external/what-to-do-next/external/whats-hot/base').register(parent, sharedData);
		require('apps/homepage/external/what-to-do-next/external/group-activity/base').register(parent, sharedData);
		require('apps/homepage/external/what-to-do-next/external/your-profile/base').register(parent, sharedData);
		require('apps/homepage/external/what-to-do-next/external/whats-new/base').register(parent, sharedData);
		require('apps/homepage/external/what-to-do-next/external/viewing-progress/base').register(parent, sharedData);
		require('apps/homepage/external/what-to-do-next/external/process/base').register(parent, sharedData);

		return parent;
	};
});