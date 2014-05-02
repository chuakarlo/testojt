define( function ( require ) {
	'use strict';

	var App              = require( 'App' );
	var MainView         = require( 'apps/learningTargets/views/MainView' );
	var CoursesView      = require( 'apps/learningTargets/views/courses/CoursesView' );
	var ProcessesView    = require( 'apps/learningTargets/views/processes/ProcessesView' );
	var ObservationsView = require( 'apps/learningTargets/views/observations/ObservationsView' );
	var PortfoliosView   = require( 'apps/learningTargets/views/portfolios/PortfoliosView' );
	var QuestionsView    = require( 'apps/learningTargets/views/questions/QuestionsView' );
	var CatalogsView     = require( 'apps/learningTargets/views/catalogs/CatalogsView' );
	var GroupsView       = require( 'apps/learningTargets/views/groups/GroupsView' );
	var DescriptionView  = require( 'apps/learningTargets/views/catalogs/Description' );
	var Backbone         = require( 'backbone' );
	var async            = require( 'async' );
	var $                = require( 'jquery' );

	App.module( 'LearningTargets.Main', function ( Main ) {
		var mainView;
		var contentRegion;

		Main.regions = {
			'Content' : Backbone.Marionette.Region.extend( { } )
		};

		Main.helper = {

			'_showView' : function ( view ) {
				contentRegion.show( view );
			},

			'_setContent' : function ( content ) {
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

				mainView.activateTab( content );
			},

			'_apiRequest' : function ( type, callback ) {
				var request = App.request( type );

				$.when( request ).done( function ( collections ) {
					// run callback with collections
					callback( collections );
				} ).fail( function ( error ) {
					// TODO: handle error
					throw error;
				} );
			},

			'_apiRequestWithArgs' : function ( type, model, callback ) {
				var request = App.request( type, model );

				$.when( request ).done( function ( collections ) {
					// run callback with collections
					callback( collections );
				} ).fail( function ( error ) {
					// TODO: handle error
					throw error;
				} );
			},

			'redirectToLegacyPage' : function ( target, page, sub, opts ) {

				// navigate to legacy page
				App.request( 'pd360:navigate', ProcessesView, page, sub, opts );

			},

			'showModalDescription' : function ( view ) {

				if ( view.model.get( 'CatalogResourceTypeId' ) === 2 ) {
					window.location.assign( 'https://www.pd360.com/pd360.cfm#tab=courses&page=coursesBrowse' );
				} else if ( view.model.get( 'CatalogResourceTypeId' ) === 3 ) {
					async.waterfall( [

						function ( callback ) {

							Main.helper._apiRequestWithArgs ( 'lt:description', view.model, function( data ) {
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

					catalogsView.on( 'itemview:lt:showdescription', helper.showModalDescription );

					// display Catalogs
					helper._showView( catalogsView );
				} );
			},

			'showGroups' : function () {
				var helper = Main.helper;

				// set content
				helper._setContent( 'groups' );

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

			}

		};

	} );

} );
