define( function ( require ) {
	'use strict';

	return {

		specs : [

			'spec/RemotingTest',

			'spec/FilteredRouterTest',

			'spec/apps/communities/CommunitiesTest',
			'spec/apps/header/HeaderTest',
			'spec/apps/learningProgression/LearningProgressionTest',
			'spec/apps/videoUploader/VideoUploaderTest',

			// Groups Test
			'spec/apps/groups/GroupsTest',
			'spec/apps/groups/entities/GroupModelTest',
			'spec/apps/groups/entities/WallCommentModelTest',
			'spec/apps/groups/entities/WallCommentCollectionTest',
			'spec/apps/groups/entities/GroupResourcesCollectionTest',
			'spec/apps/groups/entities/GroupMemberCollectionTest',
			'spec/apps/groups/entities/GroupLinksCollectionTest',

			// messages
			'spec/apps/messages/MessagesTest',
			'spec/apps/messages/entities/MessagesTest',

			// learningTargets
			'spec/apps/learningTargets/LearningTargetsTest',
			'spec/apps/learningTargets/views/MainViewTest',

			'spec/apps/learningTargets/entities/CoursesTest',
			'spec/apps/learningTargets/entities/CatalogsTest',
			'spec/apps/learningTargets/entities/CatalogDescriptionsTest',
			'spec/apps/learningTargets/entities/GroupsTest',
			'spec/apps/learningTargets/entities/ObjectivesTest',
			'spec/apps/learningTargets/entities/ObservationsTest',
			'spec/apps/learningTargets/entities/PortfoliosTest',
			'spec/apps/learningTargets/entities/ProcessesTest',

			//Start contentNavigation

			//main
			//'spec/apps/contentNavigation/ContentNavigationTest',

			//End contentNavigation

			'spec/apps/user/UserTest',
			'spec/apps/user/entities/LicenseTest',
			'spec/apps/user/entities/PersonnelTest',
			'spec/apps/user/entities/ProfileTest',

			'spec/plugins/Backbone.CFTest',

			// VideoPlayer test specs
			'spec/apps/videoPlayer/VideoPlayerTest.js',
			// models
			'spec/apps/videoPlayer/models/QuestionModelTest.js',
			// collection
			'spec/apps/videoPlayer/collections/QuestionsCollectionTest.js',
			// views/player
			'spec/apps/videoPlayer/views/player/VideoPlayerViewTest.js',
			// views/questions
			'spec/apps/videoPlayer/views/question/QuestionsCompositeViewTest.js',
			'spec/apps/videoPlayer/views/question/QuestionItemViewTest.js',
			// views/info
			'spec/apps/videoPlayer/views/VideoInfoItemViewTest.js',
			// views/share
			// views/tabs
			'spec/apps/videoPlayer/views/tabs/ButtonsItemViewTest.js',
			'spec/apps/videoPlayer/views/tabs/TabsItemViewTest.js',
			'spec/apps/videoPlayer/views/tabs/VideoCollectionViewTest.js',
			'spec/apps/videoPlayer/views/tabs/VideoResourceItemViewTest.js',
			'spec/apps/videoPlayer/views/tabs/VideoResourcesCollectionViewTest.js',
			'spec/apps/videoPlayer/views/tabs/PreviewItemViewTest.js',
			// utils
			'spec/apps/videoPlayer/plugins/selectTextTest.js',
			'spec/apps/videoPlayer/utils/UtilsTest.js',
			// entities
			'spec/apps/videoPlayer/entities/ContentTest.js',
			'spec/apps/videoPlayer/entities/RelatedVideosTest.js',
			'spec/apps/videoPlayer/entities/SegmentsTest.js',
			'spec/apps/videoPlayer/entities/UserContentTest.js',
			'spec/apps/videoPlayer/entities/VideoResourcesTest.js',

			//Homepage
			'spec/apps/homepage/external/content/controllers/contentCompositeControllerTest.js',
			'spec/apps/homepage/external/content/views/ContentCompositeViewTest.js',
			'spec/apps/homepage/external/content/views/ContentItemViewTest.js',

			//HomePage - Billboard
			'spec/apps/homepage/external/billboard/collection/BillboardCollectionTest.js',
			'spec/apps/homepage/external/billboard/configuration/nivoSettingsTest.js',
			'spec/apps/homepage/external/billboard/views/BillboardItemViewTest.js',
			'spec/apps/homepage/external/billboard/baseTest.js',

			//HomePage - Widgets
			'spec/apps/homepage/external/widgets/baseTest.js',
			'spec/apps/homepage/external/widgets/layout/WidgetLayoutTest.js',
			'spec/apps/homepage/external/widgets/views/WidgetCompositeViewTest.js',
			'spec/apps/homepage/external/widgets/views/WidgetPreviewItemViewTest.js',

			//HomePage - Courses
			'spec/apps/homepage/external/widgets/external/courses/baseTest.js',
			'spec/apps/homepage/external/widgets/external/courses/views/WidgetItemViewTest.js',
			//HomePage - Focus Objectives
			'spec/apps/homepage/external/widgets/external/focusObjective/baseTest.js',
			'spec/apps/homepage/external/widgets/external/focusObjective/views/WidgetItemViewTest.js',

			//HomePage - Group Activity
			'spec/apps/homepage/external/widgets/external/groupActivity/baseTest.js',
			'spec/apps/homepage/external/widgets/external/groupActivity/views/WidgetItemViewTest.js',

			//HomePage - Observation of Me
			'spec/apps/homepage/external/widgets/external/observationsOfMe/baseTest.js',
			'spec/apps/homepage/external/widgets/external/observationsOfMe/views/WidgetItemViewTest.js',

			//HomePage - User Settings
			'spec/apps/homepage/external/widgets/external/yourProfile/baseTest.js',
			'spec/apps/homepage/external/widgets/external/yourProfile/views/WidgetItemViewTest.js',

			// Homepage - Your Queue
			'spec/apps/homepage/external/content/external/your-queue/baseTest.js',
			'spec/apps/homepage/external/content/external/your-queue/collections/QueueCollectionTest.js',
			'spec/apps/homepage/external/content/external/your-queue/controllers/baseControllerTest.js',
			'spec/apps/homepage/external/content/external/your-queue/controllers/queueControllerTest.js',
			'spec/apps/homepage/external/content/external/your-queue/models/QueueModelTest.js',

			//Homepage - Recommended Content
			'spec/apps/homepage/external/content/external/recommended/baseTest.js',
			'spec/apps/homepage/external/content/external/recommended/collections/RecommendedCollectionTest.js',

			//Homepage - null
			'spec/apps/homepage/external/widgets/external/null/baseTest.js'
		]

	};

} );
