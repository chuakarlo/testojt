define( function ( require ) {
	'use strict';

	return {

		specs : [

			'spec/RemotingTest',

			'spec/apps/communities/CommunitiesTest',
			'spec/apps/groups/GroupsTest',
			'spec/apps/header/HeaderTest',
			'spec/apps/learningProgression/LearningProgressionTest',
			'spec/apps/user/UserTest',

			//contentNavigation
			'spec/apps/contentNavigation/main.js',
			//Models
			'spec/apps/contentNavigation/models/SegmentModelTests',
			'spec/apps/contentNavigation/models/FilterModelTests',
			//Collections
			'spec/apps/contentNavigation/collections/SegmentCollectionTests',
			'spec/apps/contentNavigation/collections/FiltersCollectionTests',
			//Views
			'spec/apps/contentNavigation/views/Filters/FilterLayoutViewTests',
			'spec/apps/contentNavigation/views/Filters/FilterContainerViewTests',
			'spec/apps/contentNavigation/views/Grid/GridLayoutViewTests',
			'spec/apps/contentNavigation/views/Layouts/HeaderLayoutViewTests',
			'spec/apps/contentNavigation/views/Segments/SegmentCollectionViewTest',
			'spec/apps/contentNavigation/views/Segments/SegmentItemViewTest',
			//Controllers
			'spec/apps/contentNavigation/controllers/GridControllerTest',
			'spec/apps/contentNavigation/controllers/HeaderControllerTest',
			'spec/apps/contentNavigation/controllers/SegmentsControllerTest',
			'spec/apps/contentNavigation/controllers/FiltersControllerTest',
			'spec/apps/contentNavigation/controllers/UtilitiesControllerTest',
			//Router
			'spec/apps/contentNavigation/routers/AppRouterTest',
			//Component
			'spec/apps/contentNavigation/components/FilterComponentTest',
			'spec/apps/contentNavigation/components/SegmentCollectionComponentTest'

		]

	};

} );
