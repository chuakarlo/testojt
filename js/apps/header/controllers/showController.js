define( function ( require ) {
	'use strict';

	var App  = require( 'App' );
	var Menu = require( 'header/views/NavLayout' );

	App.module( 'Header.Show', function ( Show ) {

		Show.Controller = {

			'showHeader' : function () {
				var authenticated = App.request( 'session:authenticated' );

				function generateLink ( params ) {
					var url = 'http://training.schoolimprovement.com/';

					if ( params ) {
						url += '#context/' + params;
					}

					return url;
				}

				function init ( helpUrl ) {
					var menu = new Menu( { 'authenticated' : authenticated, 'helpUrl' : helpUrl } );

					App.menu.show( menu );
				}

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
					// TODO: error handling
				} );

			}

		};

	} );

} );
