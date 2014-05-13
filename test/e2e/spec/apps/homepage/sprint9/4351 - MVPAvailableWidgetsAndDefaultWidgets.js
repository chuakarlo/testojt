'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function( env ) {

	describe( 'MVP Available Widgets and Default Widgets', function() {

		var browser;


		var CSS = {
			'yourProfile' : 'yourProfile',
			'focusObjective' : 'focusObjective',
			'observationsOfMe' : 'observationsOfMe'
		};


		describe( 'Default Widgets Display', function () {

			before( function() {

				browser = env.browser;

			} );

			it( 'should log you in', function( done ) {

				browser
					.elementById( 'login-input-email' ).clear().type( 'david.rojas@schoolimprovement.com' )
					.elementById( 'login-input-password' ).clear().type( 'pd360' )
					.elementById( 'login-button' ).click()
					.waitForElement( 'id', 'Home-page-view' )
					.nodeify( done );
			} );


			it( 'should display the default widgets: Observations of me, User Settings and Focus Objective', function ( done ) {

				browser.maximize();

				browser
					.elementByCssSelector( '#active-widgets #' + CSS.observationsOfMe )
					.elementByCssSelector( '#active-widgets #' + CSS.yourProfile )
					.elementByCssSelector( '#active-widgets #' + CSS.focusObjective )
					.takeScreenshot().saveScreenshot('../sc/default/' + new Date() )
					.nodeify( done );
			} );

		} );

		describe( 'MVP Available Widgets', function () {

			it( 'should display configuration settings overlay', function ( done ) {
				browser

					.elementById( 'widget-settings' ).click()
					.nodeify( done );
			});

			it( 'should be able to add/remove all available widgets in configuration settings', function ( done ) {
				browser

					.elementById( 'widget-settings' ).click()
					.elementById( 'widget-settings-selection' )
					.elementByCssSelector( '#widget-settings-selection > li:nth-child(1)' ).text().then( function ( text ) {
						text.should.equal( 'Courses' );
					} )
					.elementByCssSelector( '#widget-settings-selection > li:nth-child(2)' ).text().then( function ( text ) {
						text.should.equal( '3\nFocus Objectives' );
					} )
					.elementByCssSelector( '#widget-settings-selection > li:nth-child(3)' ).text().then( function ( text ) {
						text.should.equal( 'Group Activity' );
					} )
					.elementByCssSelector( '#widget-settings-selection > li:nth-child(4)' ).text().then( function ( text ) {
						text.should.equal( '2\nUser Settings' );
					} )
					.elementByCssSelector( '#widget-settings-selection > li:nth-child(5)' ).text().then( function ( text ) {
						text.should.equal( '1\nObservations Of Me' );
					} )

					//remove default widget in What To Do Next section
					.elementById( 'widget-settings' ).click()
					.elementById( 'widget-settings-selection' )
					.elementByCssSelector( '#widget-settings-selection > li:nth-child(2) > div.widget-icon-btn.img-circle.fa' ).click()

					//add another widget in What To Do Next section
					.elementById( 'widget-settings' ).click()
					.elementById( 'widget-settings-selection' )
					.elementByCssSelector( '#widget-settings-selection > li:nth-child(1) > div.widget-icon-btn.img-circle.fa' ).click()

					//display back the three default widgets
					.elementById( 'widget-settings' ).click()
					.elementById( 'widget-settings-selection' )
					.elementByCssSelector( '#widget-settings-selection > li:nth-child(1) > div.widget-icon-btn.img-circle.fa' ).click()

					.elementById( 'widget-settings' ).click()
					.elementById( 'widget-settings-selection' )
					.elementByCssSelector( '#widget-settings-selection > li:nth-child(2) > div.widget-icon-btn.img-circle.fa' ).click()


					.elementById( 'widget-settings' ).click()
					.nodeify( done );
			} );

			it( 'should be working in Chrome, Firefox and Safari', function ( done ) {
				browser
					.hasElement( 'id' , 'active-widgets' )
					.nodeify( done );
			} );

		} );
	} );

} );


