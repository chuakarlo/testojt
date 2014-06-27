define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	var GroupsView              = require( 'apps/learningTargets/views/groups/GroupsView' );
	var CoursesView             = require( 'apps/learningTargets/views/courses/CoursesView' );
	var CatalogsView            = require( 'apps/learningTargets/views/catalogs/CatalogsView' );
	var ProcessesView           = require( 'apps/learningTargets/views/processes/ProcessesView' );
	var PortfoliosView          = require( 'apps/learningTargets/views/portfolios/PortfoliosView' );
	var ObservationsView        = require( 'apps/learningTargets/views/observations/ObservationsView' );
	var ObjectivesFolderView    = require( 'apps/learningTargets/views/objectives/focusfolders/FocusFolderView' );
	var ObjectivesContentView   = require( 'apps/learningTargets/views/objectives/contents/ContentView' );
	var ReflectionQuestionsView = require( 'apps/learningTargets/views/reflectionQuestions/ReflectionQuestionsView' );

	var setRequestOptions = require( '../helpers/setRequestOptions' );
	var setLegacyPages    = require( '../helpers/setLegacyPages' );
	var mainHelpers       = require( '../helpers/mainHelpers' );

	App.module( 'LearningTargets.Main', function ( Main ) {

		Main.regions = {
			'Legend'  : Backbone.Marionette.Region.extend( { } ),
			'Content' : Backbone.Marionette.Region.extend( { } )
		};

		mainHelpers( Main );

		Main.controller = {

			'showLegacyPageContent' : function ( page, pageid, subpageid ) {
				var options = {
					pageid    : pageid,
					subpageid : subpageid
				};

				var helper = Main.helper;
				var opts   = setRequestOptions( page, options );

				helper.showLegacyContent( setLegacyPages( page ).page, setLegacyPages( page ).subPage, opts );
			},

			'showMain' : function () {
				App.navigate( 'resources/learning/processes', true );
			},

			'showCourses' : function () {
				var helper = Main.helper;

				// set content
				helper._setContent( 'courses' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:courses', function ( collection ) {
					var coursesView = new CoursesView( {
						collection : collection
					} );

					// display Courses
					helper._showView( coursesView );
				} );
			},

			'showProcesses' : function () {
				var helper = Main.helper;

				// set legends options
				var options  = {
					'legends' : [
						{
							'icon'  : 'fa-check lt-complete',
							'label' : 'Current'
						},
						{
							'icon'  : 'fa-clock-o lt-past-due',
							'label' : 'Not Current'
						}
					]
				};

				helper._setContent( 'processes' );

				// show a loading view while fetching data
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:processes', function ( collection ) {

					var processesView = new ProcessesView( {
						collection : collection
					} );

					// display Processes
					helper._showView( processesView );

					// show legend after content is displayed
					options.collection = collection;
					helper._showLegend( options );
				} );
			},

			'showPortfolio' : function () {
				var helper = Main.helper;

				// set content
				helper._setContent( 'portfolio' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:portfolios', function ( collection ) {
					var portfoliosView = new PortfoliosView( {
						collection : collection
					} );

					// display Portfolio
					helper._showView( portfoliosView );
				} );
			},

			'showObservations' : function () {
				var helper = Main.helper;
				helper._setContent( 'observations' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:observations', function ( collection ) {

					var observationsView = new ObservationsView( {
						collection : collection
					} );

					// display Observations
					helper._showView( observationsView );
				} );
			},

			'showCatalogs' : function () {
				var helper = Main.helper;

				Backbone.history.navigate( 'resources/learning/catalogs' );

				var options = {
					'legends' : [
						{
							'icon'  : 'fa-youtube-play',
							'label' : 'Video'
						},
						{
							'icon'  : 'fa-cubes',
							'label' : 'Training'
						},
						{
							'icon'  : 'fa-university',
							'label' : 'Edivation Course'
						}
					]
				};

				// set content
				helper._setContent( 'catalogs' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:catalogs', function ( collection ) {
					var catalogsView = new CatalogsView ( {
						collection : collection
					} );

					catalogsView.on( 'itemview:lt:training', helper.showTrainingCatalog );

					// display Catalogs
					helper._showView( catalogsView );

					// show legend after content is displayed
					options.collection = collection;
					helper._showLegend( options );

				} );
			},

			'showGroups' : function () {
				var helper = Main.helper;

				// set content
				helper._setContent( 'group-task' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:groups', function ( collection ) {
					var groupsView = new GroupsView( {
						collection : collection
					} );

					// display Groups
					helper._showView( groupsView );
				} );

			},

			'showFocusObjectives' : function ( helper, options ) {
				// set content
				helper._setContent( 'focus-objectives' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );
			},

			'showFocusObjectivesTitle' : function ( options ) {
				var helper = Main.helper;

				this.showFocusObjectives( helper, options );

				helper._apiRequest( 'lt:objectivestitle', function ( collection ) {

					var objectivesFolderView = new ObjectivesFolderView ( {
						collection : collection
					} );

					// display Focus Objectives Title
					helper._showView( objectivesFolderView );

				} );
			},

			'showFocusObjectivesContent' : function ( focusTitle, ncesId, statestdId ) {
				var helper  = Main.helper;
				var options = {
					focustitle : focusTitle,
					ncesid     : ncesId,
					statestdid : statestdId
				};

				// if browser is being refresh - then call showFocusObjectives to set content
				this.showFocusObjectives( helper, options );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:objectivescontent', function ( collection ) {

					var objectivesContentView = new ObjectivesContentView( {
						collection : collection,
						data       : options
					} );

					// change view to focus folder
					if ( collection.length > 0 && !collection.models[ 0 ].get( 'ContentId' ) ) {
						objectivesContentView = new ObjectivesFolderView ( {
							collection : collection,
							data       : options
						} );
					}

					// display contents or title of focus folders
					helper._showView( objectivesContentView );

				}, options );
			},

			'showReflectionQuestions' : function () {
				var helper = Main.helper;
				helper._setContent( 'reflection-questions' );

				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:reflection-questions', function ( collection ) {
					var reflectionQuestionsView = new ReflectionQuestionsView( {
						collection : collection
					} );

					// display Reflection Questions
					helper._showView( reflectionQuestionsView );
				} );
			}

		};

	} );

} );
