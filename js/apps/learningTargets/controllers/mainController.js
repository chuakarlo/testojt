define( function ( require ) {
	'use strict';

	var App                     = require( 'App' );
	var Backbone                = require( 'backbone' );
	var MainView                = require( 'apps/learningTargets/views/MainView' );
	var GroupsView              = require( 'apps/learningTargets/views/groups/GroupsView' );
	var CoursesView             = require( 'apps/learningTargets/views/courses/CoursesView' );
	var CatalogsView            = require( 'apps/learningTargets/views/catalogs/CatalogsView' );
	var ProcessesView           = require( 'apps/learningTargets/views/processes/ProcessesView' );
	var PortfoliosView          = require( 'apps/learningTargets/views/portfolios/PortfoliosView' );
	var DescriptionView         = require( 'apps/learningTargets/views/catalogs/DescriptionView' );
	var ObservationsView        = require( 'apps/learningTargets/views/observations/ObservationsView' );
	var ObjectivesFolderView    = require( 'apps/learningTargets/views/objectives/focusfolders/FocusFolderView' );
	var ObjectivesContentView   = require( 'apps/learningTargets/views/objectives/contents/ContentView' );
	var ReflectionQuestionsView = require( 'apps/learningTargets/views/reflectionQuestions/ReflectionQuestionsView' );
	var $                       = require( 'jquery' );

	App.module( 'LearningTargets.Main', function ( Main ) {
		var mainView;
		var contentRegion;
		var currentPage;

		var legacyPages = {
			'processes' : {
				'page'    : 'observation',
				'subPage' : 'observationProcessesOfMe'
			},

			'courses' : {
				'page'    : 'courses',
				'subPage' : 'coursesBrowse'
			},

			'portfolio' : {
				'page'    : 'home',
				'subPage' : 'homePortfolio'
			},

			'observations' : {
				'page'    : 'observation',
				'subPage' : 'observationOfMe'
			}
		};

		Main.regions = {
			'Content' : Backbone.Marionette.Region.extend( { } )
		};

		Main.helper = {

			'_showView' : function ( view ) {
				contentRegion.show( view );
			},

			'_setContent' : function ( content, options ) {
				var self = this;
				// hide pd360 flash
				App.request( 'pd360:hide' );

				// show main view
				if ( !mainView ) {
					mainView = new MainView();
					mainView.on( 'lt:viewall', self.handleViewallLink.bind( self ) );
				}

				App.content.show( mainView );

				contentRegion = new Main.regions.Content( {
					el : mainView.el.querySelector( '.lt-content' )
				} );

				self.setupViewAllLink( content );
				mainView.setupViewAllButton( content );
				mainView.activateTab( content );
			},

			'_apiRequest' : function ( type, callback, options ) {
				var request = App.request( type, options );

				App.when( request ).done( function ( collections ) {
					// run callback with collections
					callback( collections );
				} ).fail( function () {

					Main.helper._showView( new App.Common.ErrorView( {
						'message' : 'There was an error loading view.',
						'flash'   : 'An error occurred. Please try again later.'
					} ) );

				} );
			},

			'redirectToLegacyPage' : function ( target, page, sub, opts ) {
				var pd360Loaded = App.request( 'pd360:loaded' );

				// Change document hash without triggering event so clicking the back button issue
				App.navigate( Backbone.history.fragment + '/legacy' );

				// Display loading view
				App.content.show( new App.Common.LoadingView() );

				// navigate to legacy page
				App.when( pd360Loaded ).done( function () {
					App.content.show( new ProcessesView() );
					$( '.content-wrapper' ).html( '' );
					App.request( 'pd360:navigate', page, sub, opts );
				} );
			},

			'handleViewallLink' : function ( view ) {
				var self = this;
				self.redirectToLegacyPage( view, currentPage.page, currentPage.subPage );
			},

			'setupViewAllLink' : function ( content ) {
				currentPage = legacyPages[ content ];
			},

			'showTrainingCatalog' : function ( view ) {
				if ( view.model.get( 'CatalogResourceTypeId' ) === 3 ) {
					Main.helper._apiRequest( 'lt:description', function ( collection ) {

						var descriptionView = new DescriptionView( {
							model : collection.models[ 0 ]
						} );

						App.modalRegion.show( descriptionView );

					}, view.model );
				}
			}

		};

		Main.controller = {

			'showMain' : function () {
				App.navigate( 'resources/learning/processes', true );
			},

			'showCoursesWithId' : function ( id ) {
				var helper = Main.helper;

				// set content
				helper._setContent( 'courses' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:courses', function ( collection ) {
					var coursesView = new CoursesView( {
						collection       : collection,
						selectedCourseId : parseInt( id, 10 )
					} );

					// bind to redirect event
					coursesView.on( 'itemview:lt:redirect', helper.redirectToLegacyPage );

					// display Courses
					helper._showView( coursesView );
				} );
			},

			'showCourses' : function () {
				this.showCoursesWithId( 0 );
			},

			'showProcesses' : function () {
				var helper = Main.helper;

				// set content
				helper._setContent( 'processes' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:processes', function ( collection ) {

					var processesView = new ProcessesView( {
						collection : collection
					} );

					// bind to redirect event
					processesView.on( 'itemview:lt:redirect', helper.redirectToLegacyPage );

					// display Processes
					helper._showView( processesView );
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

					// bind to redirect event
					portfoliosView.on( 'itemview:lt:redirect', helper.redirectToLegacyPage );

					// display Courses
					helper._showView( portfoliosView );
				} );
			},

			'showObservations' : function () {
				this.showObservationsWithId( 0 );
			},

			'showObservationsWithId' : function ( id ) {
				var helper = Main.helper;
				helper._setContent( 'observations' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:observations', function ( collection ) {

					var observationsView = new ObservationsView( {
						collection             : collection,
						selectedObeservationId : parseInt( id, 10 )
					} );

					// bind to redirect event
					observationsView.on( 'itemview:lt:redirect', helper.redirectToLegacyPage );

					helper._showView( observationsView );
				} );
			},

			'showCatalogs' : function () {
				var helper = Main.helper;

				// set content
				helper._setContent( 'catalogs' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:catalogs', function ( collection ) {
					var catalogsView = new CatalogsView ( {
						collection : collection
					} );

					catalogsView.on( 'itemview:lt:training', helper.showTrainingCatalog );
					catalogsView.on( 'itemview:lt:redirect', helper.redirectToLegacyPage );

					// display Catalogs
					helper._showView( catalogsView );
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
					// bind to redirect event
					groupsView.on( 'itemview:lt:redirect', helper.redirectToLegacyPage );

					// display Courses
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
				var helper = Main.helper;

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

					// bind to redirect event
					reflectionQuestionsView.on( 'itemview:lt:redirect', helper.redirectToLegacyPage );

					// display Reflection Questions
					helper._showView( reflectionQuestionsView );
				} );
			}

		};

	} );

} );
