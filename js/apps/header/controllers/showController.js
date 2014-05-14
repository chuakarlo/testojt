define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );

	var Menu                = require( 'header/views/NavLayout' );
	var IconsCollectionView = require( 'header/views/IconsCollectionView' );

	var menuOptions = require( 'resources/data/menus' );

	App.module( 'Header.Show', function ( Show ) {

		var Controller = Marionette.Controller.extend( {

			'showHeader' : function () {
				var authenticated = App.request( 'session:authenticated' );

				var generateLink = function ( params ) {
					var url = 'http://help.schoolimprovement.com/';

					if ( params ) {
						url += '#context/' + params;
					}

					return url;
				};

				var init = function ( helpUrl ) {
					var menu = new Menu( { 'authenticated' : authenticated, 'helpUrl' : helpUrl } );

					if ( authenticated ) {

						this.listenToOnce( menu, 'show', function () {

							App.when( App.request( 'user:hasObsAccess' ) )

							.done( function ( hasAccess ) {
								var collection = new Backbone.Collection( menuOptions.nav );

								if ( hasAccess ) {
									collection.add( menuOptions.observation, { 'at' : 2 } );
								} else {
									collection.add( menuOptions.training, { 'at' : 4 } );
								}

								menu.icons.show( new IconsCollectionView( {
									'collection' : collection
								} ) );

							} )

							.fail( App.errorHandler.bind( App, {
								'region'  : menu.icons,
								'message' : 'There was an error getting available resources'
							} ) );

						} );

					}

					App.menu.show( menu );

				}.bind( this );

				if ( !authenticated ) {
					return init( generateLink() );
				}

				App.when( App.request( 'user:personnel' ) ).done( function ( personnel ) {
					var email       = 'email='       + personnel.attributes.EmailAddress;
					var fname       = 'fname='       + personnel.attributes.FirstName;
					var lname       = 'lname='       + personnel.attributes.LastName;
					var personnelid = 'personnelid=' + personnel.attributes.PersonnelId;
					var url         = 'url='         + window.location;

					init( generateLink( [ email, fname, lname, personnelid, url ].join( '&' ) ) );
				}.bind( this ) ).fail( function () {
					init( generateLink() );
				} );

			}

		} );

		Show.Controller = new Controller();

	} );

} );
