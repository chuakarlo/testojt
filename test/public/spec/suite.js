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

			// learningTargets
			'spec/apps/learningTargets/LearningTargetsTest',
			'spec/apps/learningTargets/views/MainViewTest',

			'spec/apps/user/UserTest',

			//Start contentNavigation

			//main
			//'spec/apps/contentNavigation/main.js',

			// //Models
			// 'spec/apps/contentNavigation/models/SegmentModelTest',
			// 'spec/apps/contentNavigation/models/FilterModelTest',
			// 'spec/apps/contentNavigation/models/WatchLaterModelTest',
			// //'spec/apps/contentNavigation/models/LibraryTreeChildrenModelTests',
			// //'spec/apps/contentNavigation/models/LibraryTreeModelTests',
			// //'spec/apps/contentNavigation/models/LicenseModelTests',
			// //'spec/apps/contentNavigation/models/UUVModelTests',

			// //Collections
			// 'spec/apps/contentNavigation/collections/SegmentCollectionTest',
			// 'spec/apps/contentNavigation/collections/FiltersCollectionTest',
			// 'spec/apps/contentNavigation/collections/WatchLaterCollectionTest',
			// //'spec/apps/contentNavigation/collections/LibraryTreeChildrenCollectionTests',
			// //'spec/apps/contentNavigation/collections//LibraryTreeCollectionTests',
			// //'spec/apps/contentNavigation/collections//LicenseCollectionTests',
			// //'spec/apps/contentNavigation/collections//UUVModelTests',

			// //Views
			// 'spec/apps/contentNavigation/views/Filters/FilterLayoutViewTest',
			// 'spec/apps/contentNavigation/views/Filters/FilterContainerViewTest',
			// 'spec/apps/contentNavigation/views/Layouts/HeaderLayoutViewTest',
			// 'spec/apps/contentNavigation/views/Segments/SegmentCollectionViewTest',
			// 'spec/apps/contentNavigation/views/Segments/SegmentItemViewTest',
			// 'spec/apps/contentNavigation/views/LibraryTree/LibraryCollectionViewTest',
			// 'spec/apps/contentNavigation/views/LibraryTree/LibraryTreeCompositeViewTest',
			// 'spec/apps/contentNavigation/views/LibraryTree/LibraryTreeItemViewTest',
			// 'spec/apps/contentNavigation/views/Licenses/LicenseItemViewTest',
			//Controllers

			//'spec/apps/contentNavigation/controllers/HeaderControllerTest',
			// 'spec/apps/contentNavigation/controllers/UtilitiesControllerTest',
			// 'spec/apps/contentNavigation/controllers/base/FilterBaseTest',
			//'spec/apps/contentNavigation/controllers/base/contentBaseTest',

			// 'spec/apps/contentNavigation/controllers/pd360Library/PD360ContentControllerTest',
			// 'spec/apps/contentNavigation/controllers/pd360Library/PD360FilterControllerTest',
			// 'spec/apps/contentNavigation/controllers/pd360Library/PD360LibraryControllerTest',

			// 'spec/apps/contentNavigation/controllers/customContentLibrary/CustomContentControllerTest',
			// 'spec/apps/contentNavigation/controllers/customContentLibrary/CustomContentFilterControllerTest',
			// 'spec/apps/contentNavigation/controllers/customContentLibrary/CustomContentLibraryControllerTest',

			// 'spec/apps/contentNavigation/controllers/userUploadedLibrary/UserUploadedContentControllerTest',
			// 'spec/apps/contentNavigation/controllers/userUploadedLibrary/UserUploadedContentFilterControllerTest',
			// 'spec/apps/contentNavigation/controllers/userUploadedLibrary/UserUploadedContentLibraryControllerTest',

			//Router
			//'spec/apps/contentNavigation/routers/AppRouterTest',
			//Component
			//'spec/apps/contentNavigation/components/FilterComponentTest',
			//'spec/apps/contentNavigation/components/SegmentCollectionComponentTest',

			//End contentNavigation

			'spec/apps/user/UserTest',
			'spec/apps/user/entities/LicenseTest',
			'spec/apps/user/entities/PersonnelTest',
			'spec/apps/user/entities/ProfileTest',

			'spec/plugins/Backbone.CFTest',

			// VideoPlayer test specs
			'spec/apps/videoPlayer/VideoPlayerTest.js',
			// models
			'spec/apps/videoPlayer/models/ContentModelTest.js',
			'spec/apps/videoPlayer/models/QuestionModelTest.js',
			'spec/apps/videoPlayer/models/RelatedVideoModelTest.js',
			'spec/apps/videoPlayer/models/PersonModelTest.js',
			'spec/apps/videoPlayer/models/GroupModelTest.js',
			// collection
			'spec/apps/videoPlayer/collections/QuestionsCollectionTest.js',
			'spec/apps/videoPlayer/collections/VideoResourcesCollectionTest.js',
			'spec/apps/videoPlayer/collections/RelatedVideoCollectionTest.js',
			'spec/apps/videoPlayer/collections/SelectedItemsCollectionTest.js',
			'spec/apps/videoPlayer/collections/PeopleCollectionTest.js',
			'spec/apps/videoPlayer/collections/GroupsCollectionTest.js',
			// views
			'spec/apps/videoPlayer/views/LoadingViewTest.js',
			// views/player
			'spec/apps/videoPlayer/views/player/VideoPlayerViewTest.js',
			// views/questions
			'spec/apps/videoPlayer/views/QuestionsCompositeViewTest.js',
			'spec/apps/videoPlayer/views/QuestionItemViewTest.js',
			// views/share
			'spec/apps/videoPlayer/views/share/ShareVideoLayoutTest.js',
			'spec/apps/videoPlayer/views/share/SharedVideoItemViewTest.js',
			'spec/apps/videoPlayer/views/share/SelectedItemsCollectionViewTest.js',
			'spec/apps/videoPlayer/views/share/SelectedItemViewTest.js',
			'spec/apps/videoPlayer/views/share/SearchResultsLayoutTest.js',
			// views/tabs
			'spec/apps/videoPlayer/views/tabs/ButtonsItemViewTest.js',
			'spec/apps/videoPlayer/views/tabs/TabsItemViewTest.js',
			'spec/apps/videoPlayer/views/tabs/VideoResourceItemViewTest.js',
			// utils
			'spec/apps/videoPlayer/utils/selectTextTest.js',
			'spec/apps/videoPlayer/utils/toHHMMSSFormatTest.js',

			//Homepage
			'spec/apps/homepage/external/content/controllers/contentCompositeControllerTest.js',
			'spec/apps/homepage/external/content/views/ContentCompositeViewTest.js',

			//Homepage
			'spec/apps/homepage/external/billboard/views/BillboardItemViewTest.js',
			'spec/apps/homepage/external/content/views/ContentItemViewTest.js',

			//HomePage - Recommended

			//Homepage - Your Queue
			'spec/apps/homepage/external/content/external/your-queue/baseTest.js'


		]

	};

} );
