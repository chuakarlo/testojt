define( function ( require ) {
	'use strict';

	return {

		specs : [

			'spec/RemotingTest',

			'spec/FilteredRouterTest',

			'spec/apps/communities/CommunitiesTest',
			'spec/apps/groups/GroupsTest',
			'spec/apps/header/HeaderTest',
			'spec/apps/learningProgression/LearningProgressionTest',

			//contentNavigation
			//'spec/apps/contentNavigation/main.js',
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
			//'spec/apps/contentNavigation/controllers/SegmentsControllerTest',
			'spec/apps/contentNavigation/controllers/FiltersControllerTest',
			'spec/apps/contentNavigation/controllers/UtilitiesControllerTest',
			//Router
			'spec/apps/contentNavigation/routers/AppRouterTest',
			//Component
			'spec/apps/contentNavigation/components/FilterComponentTest',
			//'spec/apps/contentNavigation/components/SegmentCollectionComponentTest',

			'spec/apps/user/UserTest',
			'spec/apps/user/entities/LicenseTest',
			'spec/apps/user/entities/PersonnelTest',
			'spec/apps/user/entities/ProfileTest',

			'spec/plugins/Backbone.CFTest',

			// VideoPlayer test specs
			// models
			'spec/apps/videoPlayer/models/SelectedItemModelTest.js',
			'spec/apps/videoPlayer/models/ContentModelTest.js',
			'spec/apps/videoPlayer/models/QuestionModelTest.js',
			'spec/apps/videoPlayer/models/RelatedVideoModelTest.js',
			'spec/apps/videoPlayer/models/VideoResourceModelTest.js',
			// collection
			'spec/apps/videoPlayer/collections/QuestionsCollectionTest.js',
			'spec/apps/videoPlayer/collections/VideoResourcesCollectionTest.js',
			'spec/apps/videoPlayer/collections/RelatedVideoCollectionTest.js',
			'spec/apps/videoPlayer/collections/ContentsCollectionTest.js',
			'spec/apps/videoPlayer/collections/SelectedItemsCollectionTest.js',
			// views
			'spec/apps/videoPlayer/views/ModalRegionTest.js',
			'spec/apps/videoPlayer/views/NavLayoutTest.js',
			'spec/apps/videoPlayer/views/PageLayoutTest.js',
			'spec/apps/videoPlayer/views/VideoPlayerLayoutTest.js',
			'spec/apps/videoPlayer/views/VideoTabsLayoutTest.js',
			'spec/apps/videoPlayer/views/LoadingViewTest.js',
			// views/player
			'spec/apps/videoPlayer/views/player/PlayerItemViewTest.js',
			// views/questions
			'spec/apps/videoPlayer/views/reflection/ReflectionLayoutTest.js',
			'spec/apps/videoPlayer/views/reflection/ReflectionItemViewTest.js',
			// views/share
			'spec/apps/videoPlayer/views/share/SearchResultItemViewTest.js',
			'spec/apps/videoPlayer/views/share/SearchResultsCollectionViewTest.js',
			'spec/apps/videoPlayer/views/share/ShareVideoLayoutTest.js',
			'spec/apps/videoPlayer/views/share/SharedVideoItemViewTest.js',
			'spec/apps/videoPlayer/views/share/SelectedItemsCollectionViewTest.js',
			'spec/apps/videoPlayer/views/share/SelectedItemViewTest.js',
			// views/tabs
			'spec/apps/videoPlayer/views/tabs/RelatedVideoCollectionViewTest.js',
			'spec/apps/videoPlayer/views/tabs/RelatedVideoItemViewTest.js',
			'spec/apps/videoPlayer/views/tabs/AdditionalResourcesLayoutTest.js',
			'spec/apps/videoPlayer/views/tabs/VideoResourceItemViewTest.js',
			'spec/apps/videoPlayer/views/tabs/VideoSegmentItemViewTest.js',
			'spec/apps/videoPlayer/views/tabs/VideoResourcesCollectionViewTest.js',
			'spec/apps/videoPlayer/views/tabs/VideoSegmentCollectionViewTest.js',
			// utils
			'spec/apps/videoPlayer/utils/selectTextTest.js',
			'spec/apps/videoPlayer/utils/validateEmailTest.js',
			'spec/apps/videoPlayer/utils/toHHMMSSFormatTest.js'
		]

	};

} );