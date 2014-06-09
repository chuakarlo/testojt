define ( function ( require ) {
	'use strict';

	var Marionette              = require( 'marionette' );
	var sinon                   = window.sinon;
	var App                     = require( 'App' );

	require( 'contentNavigation/ContentNavigation' )();
	require( 'contentNavigation/controllers/CustomContentController' );
	require( 'contentNavigation/controllers/UUVController' );

	describe( 'CN-ContentNavigation Controller', function () {

		before( function () {
			var stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
			App.module( 'ContentNavigation' ).stop();
		} );

		it( 'should create ContentNavigation module', function () {
			App.should.have.property( 'ContentNavigation' );
			App.ContentNavigation.should.be.an.instanceof( Marionette.Module );
		} );

		it( 'should have properties', function () {
			App.ContentNavigation.should.have.property( 'Controller' );
			App.ContentNavigation.should.have.property( 'Router' );
			App.ContentNavigation.should.have.property( 'Entities' );
			App.ContentNavigation.should.have.property( 'Views' );
		} );
		it( 'should have sub Controllers', function () {
			App.ContentNavigation.Controller.should.have.property( 'CustomContent' );
			App.ContentNavigation.Controller.should.have.property( 'PD360' );
			App.ContentNavigation.Controller.should.have.property( 'UUV' );
		} );

		it( 'should have Entities', function () {
			App.ContentNavigation.Entities.should.have.property( 'CustomContentCategories' );
			App.ContentNavigation.Entities.should.have.property( 'Filters' );
			App.ContentNavigation.Entities.should.have.property( 'Libraries' );
			App.ContentNavigation.Entities.should.have.property( 'PD360VideosCollection' );
			App.ContentNavigation.Entities.should.have.property( 'UUVCategoryCollection' );
			App.ContentNavigation.Entities.should.have.property( 'CustomContentCategoryModel' );
			App.ContentNavigation.Entities.should.have.property( 'FilterModel' );
			App.ContentNavigation.Entities.should.have.property( 'LibraryModel' );
			App.ContentNavigation.Entities.should.have.property( 'PD360VideoModel' );
			App.ContentNavigation.Entities.should.have.property( 'UUVQueryModel' );
			App.ContentNavigation.Entities.should.have.property( 'pd360QueryModel' );
		} );
	} );
} );
