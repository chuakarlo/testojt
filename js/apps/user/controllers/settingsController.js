define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );

	var NavCollectionView = require( 'user/views/settings/nav/NavCollectionView' );
	var ProfileView       = require( 'user/views/settings/profile/ProfileView' );

	App.module( 'User.Settings', function ( Mod ) {

		// A base controller to inherit from which will close when the
		// layout closes
		Mod.BaseController = Marionette.Controller.extend( {

			'initialize' : function ( options ) {
				this.layout = options.layout;
				this.listenTo( this.layout, 'close', function () {
					this.close();
				} );
			}

		} );

		Mod.NavController = Mod.BaseController.extend( {

			'initialize' : function () {
				Mod.BaseController.prototype.initialize.apply( this, arguments );

				this.navCollection = new App.Entities.NavCollection( [
					{
						'id'     : 'Licenses',
						'filter' : 'licenses'
					},
					{
						'id'     : 'Personal Reports',
						'filter' : 'personal-reports'
					},
					{
						'id'     : 'Profile',
						'filter' : 'profile'
					}
				] );

				this.showNav();
			},

			'setPage' : function ( page ) {
				this.navCollection.setActive( page );
			},

			'showNav' : function () {
				var nav = new NavCollectionView( {
					'collection' : this.navCollection
				} );

				this.layout.nav.show( nav );
			}

		} );

		Mod.ContentController = Mod.BaseController.extend( {

			'showPage' : function ( page ) {

				App.flashMessage.close();

				if ( page === 'personal-reports' ) {

					this.showReports();

				} else if ( page === 'licenses' ) {

					this.showLicenses();

				} else if ( page === 'profile' ) {

					this.showProfile();

				} else if ( page === null ) {

					App.navigate( 'settings/profile' );
					this.showProfile();

				} else {

					App.content.show( new App.Common.NotFoundView() );

				}

			},

			'showProfile' : function () {
				this.showLoading();

				var profileRequest   = App.request( 'user:profile' );
				var rolesRequest     = App.request( 'user:roles' );
				var subjectsRequest  = App.request( 'user:subjects' );
				var personnelRequest = App.request( 'user:personnel' );
				var gradesRequest    = App.request( 'user:grade-levels' );
				var dates            = App.request( 'user:career-dates' );

				App.when( profileRequest, personnelRequest, gradesRequest, rolesRequest, subjectsRequest )
				.done( function ( profile, personnel, grades, roles, subjects ) {

					var profileView = new ProfileView( {
						'profileModel' : profile,
						'careerDates'  : new Backbone.Collection( dates ),
						'roleTypes'    : roles,
						'subjects'     : subjects,
						'grades'       : grades,
						'model'        : personnel
					} );

					this.layout.content.show( profileView );

				}.bind( this ) ).fail( function ( error ) {

					this.layout.content.show( new App.Common.ErrorView( {
						'message' : error.message,
						'flash'   : 'An error occurred. Please try again later.'
					} ) );

				}.bind( this ) );

			},

			'showLoading' : function () {
				var loadingView = new App.Common.LoadingView( {
					'size' : 'large'
				} );
				this.layout.content.show( loadingView );
			},

			'closeLoading' : function () {
				this.layout.content.close();
			},

			'showReports' : function () {
				var pd360Loaded = App.request( 'pd360:loaded' );
				var loadingView = new App.Common.LoadingView();
				this.layout.content.show( loadingView );

				App.when( pd360Loaded ).done( function () {
					loadingView.close();
					App.request( 'pd360:navigate', 'home', 'homePersonalReports' );
				}.bind( this ) );

			},

			'showLicenses' : function () {
				var pd360Loaded = App.request( 'pd360:loaded' );
				var loadingView = new App.Common.LoadingView();
				this.layout.content.show( loadingView );

				App.when( pd360Loaded ).done( function () {
					loadingView.close();
					App.request( 'pd360:navigate', 'home', 'homeLicenses' );
				}.bind( this ) );
			}

		} );

		// returns an array of years
		App.reqres.setHandler( 'user:career-dates', function () {
			var start = new Date().getFullYear();
			var end   = 1919;
			var dates = [ ];

			for ( var i = start; i >= end; i-- ) {
				dates.push( { 'year' : i } );
			}

			return dates;
		} );

	} );

} );
