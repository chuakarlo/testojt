define( function ( require ) {
	'use strict';

	var _                     = require( 'underscore' );
	var async                 = require( 'async' );

	var App                   = require( 'App' );
	var Backbone              = require( 'backbone' );
	var MainView              = require( 'apps/learningTargets/views/MainView' );
	var GroupsView            = require( 'apps/learningTargets/views/groups/GroupsView' );
	var CoursesView           = require( 'apps/learningTargets/views/courses/CoursesView' );
	var CatalogsView          = require( 'apps/learningTargets/views/catalogs/CatalogsView' );
	var ProcessesView         = require( 'apps/learningTargets/views/processes/ProcessesView' );
	var QuestionsView         = require( 'apps/learningTargets/views/questions/QuestionsView' );
	var PortfoliosView        = require( 'apps/learningTargets/views/portfolios/PortfoliosView' );
	var DescriptionView       = require( 'apps/learningTargets/views/catalogs/DescriptionView' );
	var ObservationsView      = require( 'apps/learningTargets/views/observations/ObservationsView' );
	var ObjectivesTitleView   = require( 'apps/learningTargets/views/objectives/titles/TitleView' );
	var ObjectivesContentView = require( 'apps/learningTargets/views/objectives/contents/ContentView' );

	App.module( 'LearningTargets.Main', function ( Main ) {
		var mainView;
		var contentRegion;
		var titleRegion;

		Main.regions = {
			'Content' : Backbone.Marionette.Region.extend( { } )
		};

		Main.helper = {

			'_showView' : function ( view ) {
				contentRegion.show( view );
			},

			'_showTitleView' : function ( view, options ) {
				titleRegion.show( view );

				mainView.activateTab( 'focus-objectives', options );
			},

			'_convertToTimestamp' : function ( stringDate ) {
				var date = new Date( stringDate );
				return date.getTime() / 100;
			},

			'_isProcessStatusCurrent' : function ( model ) {
				return ( ( model.get( 'ProcessStatus' ) === 'Current' ) || ( model.get( 'ProcessStatus' ) === '' ) );
			},

			'_isTaskStatusCurrent' : function ( taskCompleteDateTimestamp, mainCompletedDateTimestamp ) {
				return ( taskCompleteDateTimestamp <= mainCompletedDateTimestamp ) || ( mainCompletedDateTimestamp === '' );
			},

			'_setContent' : function ( content, options ) {

				// hide pd360 flash
				App.request( 'pd360:hide' );

				// show main view
				if ( !mainView ) {
					mainView = new MainView();
				}

				App.content.show( mainView );

				contentRegion = new Main.regions.Content( {
					el : mainView.el.querySelector( '.lt-content' )
				} );

				titleRegion = new Main.regions.Content( {
					el : mainView.el.querySelector( '.focus-objectives-title' )
				} );

				mainView.activateTab( content );
			},

			'_apiRequest' : function ( type, callback, options ) {
				var request = App.request( type, options );

				App.when( request ).done( function ( collections ) {
					// run callback with collections
					callback( collections );
				} ).fail( function ( error ) {
					// TODO: handle error
					throw error;
				} );
			},

			'_apiRequestWithArgs' : function ( type, model, callback ) {
				var request = App.request( type, model );

				App.when( request ).done( function ( collections ) {
					// run callback with collections
					callback( collections );
				} ).fail( function ( error ) {
					// TODO: handle error
					throw error;
				} );
			},

			'redirectToLegacyPage' : function ( target, page, sub, opts ) {
				var pd360Loaded = App.request( 'pd360:loaded' );

				// Change documet hash without triggering event so clicking the back button issue
				App.navigate( Backbone.history.fragment + '/legacy' );

				// Display loading view
				App.content.show( new App.Common.LoadingView() );

				// navigate to legacy page
				App.when( pd360Loaded ).done( function () {

					App.content.show( new ProcessesView() );
					App.request( 'pd360:navigate', page, sub, opts );
				} );
			},

			'performEvent' : function ( view ) {
				if ( view.model.get( 'CatalogResourceTypeId' ) === 1 ) {
					window.location.assign( 'dev.html#resources/videos/' + view.model.get( 'ResourceId' ) );
				} else if ( view.model.get( 'CatalogResourceTypeId' ) === 2 ) {
					window.location.assign( 'https://www.pd360.com/pd360.cfm#tab=courses&page=coursesBrowse' );
				} else if ( view.model.get( 'CatalogResourceTypeId' ) === 3 ) {
					async.waterfall( [

						function ( callback ) {

							Main.helper._apiRequestWithArgs ( 'lt:description', view.model, function ( data ) {
								var model = data.models[ 0 ];
								callback ( null, model );
							} );

						}

					], function ( err, model ) {

						var descriptionView = new DescriptionView( {
							model : model
						} );

						App.modalRegion.show( descriptionView );

					});
				}

			}

		};

		Main.controller = {

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

				// set content
				helper._setContent( 'processes' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:processes', function ( collection ) {
					_.each( collection.models, function ( model, index ) {
						var mainCompletedDateTimestamp = helper._convertToTimestamp( model.get( 'CompleteByDate' ) );
						var tasks                      = model.get( 'Tasks' );

						if ( helper._isProcessStatusCurrent( model ) === true ) {
							collection.models[ index ].attributes.txtColor = 'step-current';
						} else {
							collection.models[ index ].attributes.txtColor = 'step-not-current';
						}

						_.each( tasks, function ( taskObj ) {
							var taskCompleteDateTimestamp = helper._convertToTimestamp( taskObj.CompleteByDate );

							if ( helper._isTaskStatusCurrent( taskCompleteDateTimestamp, mainCompletedDateTimestamp ) === true ) {
								taskObj.status   = 'Current';
								taskObj.txtColor = 'step-current';
							} else {
								taskObj.status   = 'Not Current';
								taskObj.txtColor = 'step-not-current';
							}

						} );

					} );

					var processesView = new ProcessesView( {
						collection : collection
					} );

					// bind to redirect event
					processesView.on( 'itemview:lt:redirect', helper.redirectToLegacyPage );

					// display Courses
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
				var helper = Main.helper;
				helper._setContent( 'observations' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:observations', function ( collection ) {
					var observationsView = new ObservationsView( {
						collection : collection
					} );
					// bind to redirect event
					observationsView.on( 'itemview:lt:redirect', helper.redirectToLegacyPage );

					helper._showView( observationsView );
				} );
			},

			'showQuestions' : function () {
				var helper = Main.helper;
				helper._setContent( 'questions' );

				var questionsView = new QuestionsView( {
					collection : new Backbone.Collection( [ { }, { }, { } ] ) // temporary implementation
				} );

				helper._showView( questionsView );
			},

			'showCatalogs' : function () {
				var helper = Main.helper;

				// set content
				helper._setContent( 'catalogs' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:catalogs', function ( collection ) {

					collection.add ( {
						'CatalogId'             : '255',
						'CatalogResourceId'     : '88',
						'CatalogResourceTypeId' : 2,
						'CreditHours'           : '5',
						'Modified'              : 'February, 21 2014 15:52:42',
						'Modifier'              : '13778',
						'Removed'               : '',
						'Remover'               : '0',
						'ResourceDesc'          : 'Description 1',
						'ResourceId'            : '3067',
						'ResourceName'          : 'Course 1',
						'Visible'               : '1'
					});

					var catalogsView = new CatalogsView ( {
						collection : collection
					} );

					catalogsView.on( 'itemview:lt:performevent', helper.performEvent );

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

					var objectivesTitleView = new ObjectivesTitleView ( {
						collection : collection
					} );

					// display Focus Objectives Title
					helper._showView( objectivesTitleView );

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
						objectivesContentView = new ObjectivesTitleView ( {
							collection : collection,
							data       : options
						} );
					}

					// display contents or title of focus folders
					helper._showView( objectivesContentView );

				}, options );
			}
		};

	} );

} );
