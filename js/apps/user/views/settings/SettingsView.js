define( function ( require ) {
	'use strict';

	var Backbone   = require( 'backbone' );
	var template   = require( 'text!user/templates/settings/settings.html' );
	var _          = require( 'underscore' );
	var App;

	var PersonalInfoView = require( './PersonalInfoView' );
	var LicensesView     = require( './LicensesView' );
	var ProfileView      = require( './ProfileView' );
	var ReportsView      = require( './ReportsView' );

	var page;

	return Backbone.Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'settings' : '#settings',
			'profile'  : '#profile'
		},

		'initialize' : function ( options ) {
			if ( options.page ) {
				page = options.page;
			}
		},

		'setProfileModel' : function ( profile ) {
			this.profileModel = profile;
		},

		'setPersonnelModel' : function ( personnel ) {
			this.personnelModel = personnel;
		},

		'onShow' : function () {
			this.showProfile();
			this.showSettings();
		},

		'showProfile' : function () {
			// new profile section
			var profile = new ProfileView( { 'page' : page } );

			// set necessary models for profile
			profile.setProfileModel( this.profileModel );
			profile.setPersonnelModel( this.personnelModel );

			// show the view
			this.profile.show( profile );

			// listen for nav changes from the profile view
			this.listenTo( profile, 'nav:change', this.onNavChange );
		},

		'showSettings' : function () {
			// show the view
			this.settings.show( this.getPage() );
		},

		'onNavChange' : function ( path ) {
			page = path;

			this.settings.show( this.getPage() );

			App = App || require( 'App' );
			App.navigate( 'settings/' + page );
		},

		'getPage' : function () {
			var sub;

			if ( page === 'licenses' ) {
				sub = new LicensesView();
			}

			else if ( page === 'reports' ) {
				sub = new ReportsView();
			}

			else {
				sub = new PersonalInfoView();

				// listen for updates on the personal info page, update profile view
				sub.on( 'model:change', function () {
					this.profile.currentView.render();
				}.bind( this ) );

				// set the personnel model
				sub.setPersonnelModel( this.personnelModel );
			}

			return sub;
		}

	} );

} );
