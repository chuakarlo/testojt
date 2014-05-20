/* eslint max-nested-callbacks: [2, 5] */
define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var sinon      = window.sinon;

	require( 'user/User' );

	describe( 'User Module', function () {
		after( function () {
			App.module( 'User' ).stop();
		} );

		it( 'should create module `User`', function () {
			App.should.have.property( 'User' );
			App.User.should.be.an.instanceof( Marionette.Module );
		} );

		describe( 'User Settings Module', function () {

			var settingsContentController;
			var SettingsLayout;
			var reqLoadedSpy;
			var closeSpy;
			var deferred;
			var loadingView;

			before( function () {

				closeSpy            = sinon.spy();
				var LoadingItemView = Marionette.ItemView.extend( {
					'close'    : closeSpy,
					'template' : _.template( '<div> Item</div> ' )
				} );

				App.module( 'Common', function ( common, App ) {
					loadingView        = common.LoadingView;
					common.LoadingView = LoadingItemView;
				} );

				var ContentController     = App.User.Settings.ContentController;
				SettingsLayout            = require( 'user/views/settings/SettingsLayout' );
				settingsContentController = new ContentController( { 'layout' : new ( SettingsLayout ) () } );

				deferred                  = new $.Deferred();
				deferred.resolve( );
				reqLoadedSpy              = sinon.stub( App, 'request' ).returns( deferred.promise() );

			} );

			after( function () {
				App.request.restore();
				App.module( 'Common', function ( common, App ) {
					common.LoadingView = loadingView;
				} );
				App.module( 'Common' ).stop();
			} );

			it( 'should create User.Settings module', function (  ) {
				App.User.should.have.property( 'Settings' );
			} );

			it( 'showLicenses', function ( done ) {

				settingsContentController.showLicenses( );

				App.when( deferred ).done( function () {
					reqLoadedSpy.callCount.should.be.at.least( 1 );
					closeSpy.callCount.should.be.at.least( 1 );
					done();
				} );

			} );

			it( 'showReports', function ( done ) {

				settingsContentController.showReports( );

				App.when( deferred ).done( function () {
					reqLoadedSpy.callCount.should.be.at.least( 2 );
					closeSpy.callCount.should.be.at.least( 2 );
					done();
				} );

			} );

		} );

	} );

} );
